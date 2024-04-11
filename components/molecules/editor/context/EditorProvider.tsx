import { FC, useCallback, useMemo, useState } from 'react';
import { uuid } from 'utils';

import { Block } from '../block/Block';
import { IBlockData, IBlockNode } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { EditorContext } from './EditorContext';
import {
  IEditorContext,
  IEditorProviderProps,
  TAddBlock,
  TFocusPreviousText,
  TRemoveBlock,
} from './EditorContext.types';

export const EditorProvider: FC<IEditorProviderProps> = ({
  children,
  content,
  isEditable = true,
}) => {
  const [data, setData] = useState(content.blocks);
  const [hoveredBlock, setHoveredBlock] = useState<IBlockNode>();

  const addBlock: TAddBlock = useCallback((type, currentBlock) => {
    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlock.id);
      const newBlock = createBlock(type);

      return [...prevData.slice(0, index + 1), newBlock, ...prevData.slice(index + 1)];
    });
  }, []);

  const removeBlock: TRemoveBlock = useCallback((removedBlockId) => {
    setData((prevData) => {
      return prevData.filter((block) => block.id !== removedBlockId);
    });
  }, []);

  const focusPreviousText: TFocusPreviousText = useCallback(() => {
    // TODO: implement previous focusable text
  }, []);

  const api = useMemo(
    () => ({ addBlock, removeBlock, focusPreviousText }),
    [addBlock, removeBlock, focusPreviousText],
  );

  const renderBlocks = useCallback(() => {
    return data.map((block) => {
      const Component = EDITOR_TOOLS[block.type].block;
      if (!Component) {
        console.error('Tool not found for ', block.type);
        return <div key={block.id}>default block</div>;
      }

      return (
        <Block {...block} key={block.id} onMouseEnter={setHoveredBlock}>
          <Component api={api} isEditable={isEditable} {...block} />
        </Block>
      );
    });
  }, [data, api]);

  const store = useMemo(
    () =>
      ({
        data,
        tools: EDITOR_TOOLS,
        addBlock,
        renderBlocks,
        hoveredBlock,
      }) satisfies IEditorContext,
    [data, renderBlocks, addBlock, hoveredBlock],
  );

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
};

function createBlock(type: IBlockData['type']): IBlockData {
  return { data: undefined, id: uuid(8), type };
}
