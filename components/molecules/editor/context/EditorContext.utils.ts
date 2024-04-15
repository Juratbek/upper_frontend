import { Dispatch, SetStateAction } from 'react';
import { uuid } from 'utils';

import { IBlockData } from '../instance/Editor.types';
import { ITool } from '../tools/tool.types';
import {
  IEditorAPI,
  IEditorContext,
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

type TSetData = Dispatch<SetStateAction<IBlockData[]>>;

export const bindEditorDataState = (
  setData: TSetData,
  tools: IEditorContext['tools'],
): IEditorAPI => {
  const addBlock: TAddBlock = (type, currentBlockId) => {
    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlockId);
      const newBlock = createBlock(type, tools[type]);

      return [...prevData.slice(0, index + 1), newBlock, ...prevData.slice(index + 1)];
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

          return newData;
        }
      }
      return newData;
    });
  };

  const focusPreviousText: TFocusPreviousText = () => {
    // TODO: implement previous focusable text
  };

  const removeBlock: TRemoveBlock = (removedBlockId) => {
    setData((prevData) => {
      return prevData.filter((block) => block.id !== removedBlockId);
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

          return newData;
        }
      }
      return newData;
    });
  };

  const setBlock: TSetBlock = (block) => {
    setData((prevBlocks) =>
      prevBlocks.map((b) => {
        if (b.id === block.id) return block;
        return b;
      }),
    );
  };

  return {
    addBlock,
    moveBlockDown,
    moveBlockUp,
    focusPreviousText,
    removeBlock,
    setBlock,
  };
};
