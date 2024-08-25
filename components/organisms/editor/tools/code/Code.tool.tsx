import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle, language, syntaxHighlighting } from '@codemirror/language';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { useModal } from 'hooks';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Code.module.scss';
import { ICodeData } from './Code.types';
import { Header } from './header/Header';
import { LANGUAGES } from './header/Header.constants';

const debounce = debouncer<ICodeData>();

export const languageConf = new Compartment();
export const defaultLanguage = 'javascript';

export const Code = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<ICodeData>) {
    const textareaRef = useRef<HTMLDivElement>(null);
    const [isHovered, toggleIsHovered] = useModal();
    const [isFocused, toggleIsFocused] = useModal();
    const isHeaderVisible = isHovered || isFocused;
    const [editorView, setEditorView] = useState<EditorView>();

    const updateListener = useMemo(() => {
      return EditorView.updateListener.of((value) => {
        const code = value.state.doc.toString();
        const lang = value.state.facet(language)?.name ?? defaultLanguage;

        debounce({ code, language: lang }, (data) => api.setBlock<ICodeData>({ id, type, data }));
      });
    }, [id, type, api.setBlock]);

    const extensions = useMemo(() => {
      const langExtension = LANGUAGES[data.language]?.extension?.() ?? javascript();

      return [
        updateListener,
        EditorState.readOnly.of(!isEditable),
        EditorView.editable.of(isEditable),
        languageConf.of(langExtension),
        history(),
        keymap.of([...defaultKeymap, indentWithTab, ...historyKeymap, ...closeBracketsKeymap]),
        syntaxHighlighting(defaultHighlightStyle),
        closeBrackets(),
      ];
    }, [updateListener, isEditable]);

    const state = useMemo(() => {
      return EditorState.create({
        doc: data?.code ?? '// Assalamu aleykum, upper.uz saytiga xush kelibsiz',
        extensions,
      });
    }, [extensions]);

    useEffect(() => {
      const editorView = new EditorView({
        parent: textareaRef.current!,
        state,
      });
      setEditorView(editorView);

      return () => editorView.destroy();
    }, [state]);

    return (
      <div className={cls.container} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered}>
        {isHeaderVisible && editorView && <Header isEditable={isEditable} editor={editorView} />}
        <div
          ref={textareaRef}
          className={cls.textarea}
          onFocus={toggleIsFocused}
          onBlur={toggleIsFocused}
        ></div>
      </div>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.code !== currentData.code) return false;

    return true;
  },
);
