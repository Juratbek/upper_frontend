import { Dispatch, SetStateAction } from 'react';
import { uuid } from 'utils';

import { IBlockData, IEditorProps } from '../instance/Editor.types';
import { ITool, TToolsMapper, TToolType } from '../tools/tool.types';
import {
  IEditorAPI,
  IEditorContext,
  IInlineToolbar,
  TAddBlock,
  TAddBlocks,
  TFocusPreviousText,
  TMoveBlockDown,
  TMoveBlockUp,
  TRemoveBlock,
  TSetBlock,
  TToolsTagsMap,
} from './EditorContext.types';

function generateBlockId() {
  return uuid(8);
}

function createBlock(
  type: IBlockData['type'],
  data?: IBlockData['data'],
  tool?: ITool,
): IBlockData {
  return { data: data ?? tool?.initialData ?? {}, id: generateBlockId(), type };
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
  const addBlocks: TAddBlocks = (blocks, currentBlockId) => {
    const newBlocks = blocks.map((block) => createBlock(block.type, block.data));

    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlockId);

      const updatedBlocks = [
        ...prevData.slice(0, index + 1),
        ...newBlocks,
        ...prevData.slice(index + 1),
      ];

      callbacks.onChange?.(updatedBlocks);

      return updatedBlocks;
    });
  };

  const addBlock: TAddBlock = (type, currentBlockId, data) => {
    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlockId);
      const newBlock = createBlock(type, data, tools[type]);

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
    addBlocks,
  };
};

export function generateToolsTagsMap(tools: TToolsMapper) {
  return Object.entries(tools).reduce<TToolsTagsMap>((tagsMap, [toolType, tool]) => {
    const { tags } = tool;
    if (!tags || !Array.isArray(tags)) return tagsMap;

    tags.forEach((tag) => {
      tagsMap[tag] = toolType as TToolType;
    });

    return tagsMap;
  }, {});
}
