import { Dispatch, SetStateAction } from 'react';
import { uuid } from 'utils';

import { IBlockData } from '../instance/Editor.types';
import {
  IEditorAPI,
  TAddBlock,
  TFocusPreviousText,
  TMoveBlockDown,
  TMoveBlockUp,
  TRemoveBlock,
} from './EditorContext.types';

function generateBlockId() {
  return uuid(8);
}

function createBlock(type: IBlockData['type']): IBlockData {
  return { data: undefined, id: generateBlockId(), type };
}

type TSetData = Dispatch<SetStateAction<IBlockData[]>>;

export const bindEditorDataState = (setData: TSetData): IEditorAPI => {
  const addBlock: TAddBlock = (type, currentBlock) => {
    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlock.id);
      const newBlock = createBlock(type);

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

  return {
    addBlock,
    moveBlockDown,
    moveBlockUp,
    focusPreviousText,
    removeBlock,
  };
};
