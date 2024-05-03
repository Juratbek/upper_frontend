import { language } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { useClipboard } from 'hooks';
import { useMemo, useState } from 'react';
import { getClassName } from 'utils';
import { ICONS } from 'variables/icons';

import { defaultLanguage, languageConf } from '../Code.tool';
import { ILanguage } from '../Code.types';
import { LANGUAGES } from './Header.constants';
import cls from './Header.module.scss';

const CopyButton = ICONS.copy;
const DownIcon = ICONS.down;

export const Header = ({ editor }: { editor: EditorView }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { writeText, isCopied, isLoading, isError } = useClipboard();

  const languageSelectHandler = (language: ILanguage) => {
    setIsPopoverOpen(false);
    editor.dispatch({ effects: languageConf.reconfigure(language.extension()) });
  };

  const copyHandler = () => writeText(editor.state.doc.toString());

  const copyBtnText = useMemo(() => {
    if (isLoading) return 'Nusxalanmoqda...';
    if (isCopied) return 'Nusxalandi';
    if (isError) {
      alert(
        "Nusxalashda xatolik yuz berdi. Iltimos qayta urinib ko'ring. Muammo takrorlansa bu haqda upper_contact_bot telegram botimizga xabar bering",
      );
    }
    return 'Nusxalash';
  }, [isLoading, isCopied]);

  return (
    <div className={cls.header}>
      <div className={cls['language-container']}>
        <button className={cls['language-btn']} onClick={() => setIsPopoverOpen((prev) => !prev)}>
          {LANGUAGES[editor.state.facet(language)?.name ?? defaultLanguage].label}
          <DownIcon />
        </button>
        <div
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
      <button className={getClassName(cls.copy, isCopied && cls.active)} onClick={copyHandler}>
        <CopyButton color={isCopied ? 'white' : 'black'} width={20} height={20} />
        {copyBtnText}
      </button>
    </div>
  );
};
