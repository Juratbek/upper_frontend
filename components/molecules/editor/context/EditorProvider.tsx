import { FC, useCallback, useMemo, useState } from 'react';

import { Block } from '../block/Block';
import { IBlockData, IBlockNode } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { EditorContext } from './EditorContext';
import { IEditorContext, IEditorProviderProps, IInlineToolbar } from './EditorContext.types';
import { bindEditorDataState } from './EditorContext.utils';

const mapper = EDITOR_TOOLS;

export const EditorProvider: FC<IEditorProviderProps> = ({
  children,
  content,
  isEditable = true,
  onChange,
}) => {
  const [data, setData] = useState(content.blocks);
  const [hoveredBlock, setHoveredBlock] = useState<IBlockNode>();
  const [focusedBlock, setFocusedBlock] = useState<IBlockData>();
  const [inlineToolbar, setInlineToolbar] = useState<IInlineToolbar>({});

  const api = useMemo(
    () => bindEditorDataState({ setData, setInlineToolbar }, mapper, { onChange }),
    [onChange, setInlineToolbar],
  );

  const renderBlocks = useCallback(() => {
    return data.map((block) => {
      const Component = mapper[block.type]?.block;

      if (!Component) {
        console.error('Tool not found for ', block.type, block.data);
        return <div key={block.id}>default block</div>;
      }

      return (
        <Block {...block} key={block.id} onMouseEnter={setHoveredBlock} onClick={setFocusedBlock}>
          <Component api={api} isEditable={isEditable} {...block} />
        </Block>
      );
    });
  }, [data, api]);

  const store = useMemo(
    () =>
      ({
        data,
        tools: mapper,
        ...api,
        renderBlocks,
        hoveredBlock,
        focusedBlock,
        isEditable,
        inlineToolbar,
      }) satisfies IEditorContext,
    [data, api, hoveredBlock, focusedBlock, isEditable, inlineToolbar],
  );

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
};
