import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Code.module.scss';
import { ICodeData } from './Code.types';
import { Header } from './header/Header';

const debounce = debouncer<string>();
export const languageConf = new Compartment();

export const Code = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<ICodeData>) {
    const textareaRef = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView>();

    const updateListener = useMemo(() => {
      return EditorView.updateListener.of((value) => {
        const code = value.state.doc.toString();
        debounce(code, () =>
          api.setBlock<ICodeData>({ id, type, data: { code, language: 'javascript' } }),
        );
      });
    }, [id, type, api.setBlock]);

    const extensions = useMemo(
      () => [
        updateListener,
        EditorState.readOnly.of(!isEditable),
        languageConf.of(javascript()),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        syntaxHighlighting(defaultHighlightStyle),
      ],
      [updateListener, isEditable],
    );

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
      <div className={cls.container}>
        {editorView && <Header editor={editorView} />}
        <div ref={textareaRef} className={cls.textarea}></div>
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
