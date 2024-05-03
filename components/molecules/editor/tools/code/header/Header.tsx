import { language } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { useState } from 'react';
import { ICONS } from 'variables/icons';

import { languageConf } from '../Code.tool';
import { ILanguage } from '../Code.types';
import { LANGUAGES } from './Header.constants';
import cls from './Header.module.scss';

const CopyButton = ICONS.copy;
const DownIcon = ICONS.down;

export const Header = ({ editor }: { editor: EditorView }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const languageSelectHandler = (language: ILanguage) => {
    setIsPopoverOpen(false);
    editor.dispatch({ effects: languageConf.reconfigure(language.extension()) });
  };

  return (
    <div className={cls.header}>
      <div className={cls['language-container']}>
        <button className={cls['language-btn']} onClick={() => setIsPopoverOpen((prev) => !prev)}>
          {LANGUAGES[editor.state.facet(language)?.name ?? 'javascript'].label}
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
      <button className={cls.copy}>
        <CopyButton color='black' width={20} height={20} />
        Nushalash
      </button>
    </div>
  );
};
