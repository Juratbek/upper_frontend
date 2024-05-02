import { Dispatch, SetStateAction } from 'react';
import { uuid } from 'utils';

import { IBlockData, IEditorProps } from '../instance/Editor.types';
import { ITool } from '../tools/tool.types';
import {
  IEditorAPI,
  IEditorContext,
  IInlineToolbar,
  TAddBlock,
  TFocusPreviousText,
  TMoveBlockDown,
  TMoveBlockUp,
  TRemoveBlock,
  TSetBlock,
} from './EditorContext.types';

function generateBlockId() {
  return uuid(8);
}

function createBlock(type: IBlockData['type'], tool: ITool): IBlockData {
  return { data: tool.initialData ?? {}, id: generateBlockId(), type };
}

interface IStateHandlers {
  setData: Dispatch<SetStateAction<IBlockData[]>>;
  setInlineToolbar: Dispatch<SetStateAction<IInlineToolbar>>;
}

interface ICallbacks extends Pick<IEditorProps, 'onChange'> {}

export const bindEditorDataState = (
  { setData, setInlineToolbar }: IStateHandlers,
  tools: IEditorContext['tools'],
  callbacks: ICallbacks,
): IEditorAPI => {
  const addBlock: TAddBlock = (type, currentBlockId) => {
    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlockId);
      const newBlock = createBlock(type, tools[type]);

      const updatedBlocks = [
        ...prevData.slice(0, index + 1),
        newBlock,
        ...prevData.slice(index + 1),
      ];

      callbacks.onChange?.(updatedBlocks);

      return updatedBlocks;
    });
  };

  const moveBlockDown: TMoveBlockDown = (id) => {
    setData((prevData) => {
      const newData = [...prevData];
      for (let i = 0; i < prevData.length - 1; i++) {
        const currentBlock = prevData[i];
        if (currentBlock.id === id) {
          // update current block id for triggering render for this block
          currentBlock.id = generateBlockId();

          // update next block id for triggering render for this block
          const nextBlock = prevData[i + 1];
          nextBlock.id = generateBlockId();

          // switch blocks order
          newData[i] = nextBlock;
          newData[i + 1] = currentBlock;

          callbacks.onChange?.(newData);
          return newData;
        }
      }

      callbacks.onChange?.(newData);
      return newData;
    });
  };

  const focusPreviousText: TFocusPreviousText = () => {
    // TODO: implement previous focusable text
  };

  const removeBlock: TRemoveBlock = (removedBlockId) => {
    setData((prevData) => {
      const updatedBlocks = prevData.filter((block) => block.id !== removedBlockId);

      callbacks.onChange?.(updatedBlocks);

      return updatedBlocks;
    });
  };

  const moveBlockUp: TMoveBlockUp = (id) => {
    setData((prevData) => {
      const newData = [...prevData];
      for (let i = 1; i < prevData.length; i++) {
        const currentBlock = prevData[i];
        if (currentBlock.id === id) {
          // update current block id for triggering render for this block
          currentBlock.id = generateBlockId();

          // update next block id for triggering render for this block
          const prevBlock = prevData[i - 1];
          prevBlock.id = generateBlockId();

          // switch blocks order
          newData[i] = prevBlock;
          newData[i - 1] = currentBlock;

          callbacks.onChange?.(newData);
          return newData;
        }
      }

      callbacks.onChange?.(newData);
      return newData;
    });
  };

  const setBlock: TSetBlock = (block) => {
    setData((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((b) => {
        if (b.id === block.id) return block;
        return b;
      });

      callbacks.onChange?.(updatedBlocks);

      return updatedBlocks;
    });
  };

  const showInlineToolbar = (data: IInlineToolbar) => setInlineToolbar(data);

  const hideInlineToolbar = () => setInlineToolbar({});

  return {
    addBlock,
    moveBlockDown,
    moveBlockUp,
    focusPreviousText,
    removeBlock,
    setBlock,
    showInlineToolbar,
    hideInlineToolbar,
  };
};
