import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { memo, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import { ICodeData } from './Code.types';
import { Header } from './header/Header';

const debounce = debouncer<string>();

export const Code = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<ICodeData>) {
    const textareaRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<EditorView | null>(null);

    useEffect(() => {
      editorRef.current = new EditorView({
        parent: textareaRef.current!,
        doc: data?.code ?? '// Assalamu aleykum, upper.uz saytiga xush kelibsiz',
        extensions: [
          EditorView.updateListener.of((value) => {
            const code = value.state.doc.toString();
            debounce(code, () => api.setBlock<ICodeData>({ id, type, data: { code } }));
          }),
          EditorState.readOnly.of(!isEditable),
          javascript({ jsx: true }),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          syntaxHighlighting(defaultHighlightStyle),
        ],
      });

      return () => editorRef.current!.destroy();
    }, [id, type]);

    return (
      <>
        <Header />
        <div ref={textareaRef}></div>
      </>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.code !== currentData.code) return false;

    return true;
  },
);
