import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { FC, useEffect, useRef } from 'react';

import { IToolProps } from '../tool.types';
import { ICodeData } from './Code.types';
import { Header } from './header/Header';

export const Code: FC<IToolProps<ICodeData>> = ({ data, isEditable }) => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    editorRef.current = new EditorView({
      parent: textareaRef.current!,
      doc: data?.code ?? '// Salom dunyo',
      extensions: [
        EditorState.readOnly.of(!isEditable),
        javascript({ jsx: true }),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        syntaxHighlighting(defaultHighlightStyle),
      ],
    });

    return () => editorRef.current!.destroy();
  }, []);

  return (
    <div>
      <Header />
      <div ref={textareaRef}></div>
    </div>
  );
};
