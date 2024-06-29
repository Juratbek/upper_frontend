import { language as CodemirrorLanguage } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { CopyIcon, DoneIcon, DownIcon } from 'components/icons';
import { useClickOutside, useClipboard, useTheme } from 'hooks';
import { useId, useState } from 'react';

import { defaultLanguage, languageConf } from '../Code.tool';
import { ILanguage } from '../Code.types';
import { LANGUAGES } from './Header.constants';
import cls from './Header.module.scss';

export const Header = ({ editor, isEditable }: { editor: EditorView; isEditable: boolean }) => {
  if (!isEditable) return <CopyButton editor={editor} />;

  return <LanguageSelector editor={editor} />;
};

const CopyButton = ({ editor }: { editor: EditorView }) => {
  const { themeColors } = useTheme();

  const { writeText, isCopied } = useClipboard({
    onError: () => alert('Kodni nusxalashda xatolik yuz berdi'),
  });

  const copyHandler = () => writeText(editor.state.doc.toString());

  return (
    <button className={cls.copy} onClick={copyHandler}>
      {isCopied ? (
        <DoneIcon width={20} height={20} color={themeColors.icon} />
      ) : (
        <CopyIcon color={themeColors.icon} width={20} height={20} opacity={0.4} />
      )}
    </button>
  );
};

const LanguageSelector = ({ editor }: { editor: EditorView }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const id = useId().replaceAll(':', '');
  const [ref] = useClickOutside(() => setIsPopoverOpen(false), `#${id}`);

  const languageSelectHandler = (language: ILanguage) => {
    setIsPopoverOpen(false);
    editor.dispatch({ effects: languageConf.reconfigure(language.extension()) });
  };

  const language = editor.state.facet(CodemirrorLanguage)?.name ?? defaultLanguage;

  return (
    <div className={cls['language-container']}>
      <button
        id={id}
        className={cls['language-btn']}
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        {LANGUAGES[language].label}
        <DownIcon width={20} height={20} />
      </button>
      <div
        ref={ref}
        className={cls['languages-popover']}
        style={{ display: isPopoverOpen ? 'block' : 'none' }}
      >
        {Object.values(LANGUAGES).map((lang) => (
          <div className={cls.item} key={lang.label} onClick={() => languageSelectHandler(lang)}>
            {lang.label}
          </div>
        ))}
      </div>
    </div>
  );
};
