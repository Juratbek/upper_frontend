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
  TMergeWithPrevBlock,
  TMoveBlockDown,
  TMoveBlockUp,
  TRemoveBlock,
  TSetBlock,
  TSetEditorBlocks,
  TToolsTagsMap,
} from './EditorContext.types';

function generateBlockId() {
  return uuid(8);
}

export function createBlock(
  type: IBlockData['type'],
  data?: IBlockData['data'],
  tool?: ITool,
): IBlockData {
  return { data: data ?? tool?.initialData ?? {}, id: generateBlockId(), type };
}

interface IStateHandlers {
  setData: TSetEditorBlocks;
  setInlineToolbar: Dispatch<SetStateAction<IInlineToolbar>>;
}

interface ICallbacks extends Pick<IEditorProps, 'onChange'> {}

export const bindEditorDataState = (
  { setData, setInlineToolbar }: IStateHandlers,
  tools: IEditorContext['tools'],
  callbacks: ICallbacks,
): IEditorAPI => {
  const sanitizeBlocks = (blocks: IBlockData[]): IBlockData[] => {
    const sanitizedBlocks = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      const { sanitize } = tools[block.type];
      if (!sanitize) {
        sanitizedBlocks.push(block);
        continue;
      }

      const sanitizedBlockData = sanitize(block.data);
      if (sanitizedBlockData) {
        block.data = sanitizedBlockData;
        sanitizedBlocks.push(block);
      }
    }

    return sanitizedBlocks;
  };

  const onBlocksChange = (blocks: IBlockData[]) => {
    const sanitizedBlocks = sanitizeBlocks(blocks);
    callbacks.onChange?.(sanitizedBlocks);
  };

  const addBlocks: TAddBlocks = (blocks, currentBlockId) => {
    const newBlocks = blocks.map((block) => createBlock(block.type, block.data));

    setData((prevData) => {
      const index = prevData.findIndex((block) => block.id === currentBlockId);

      const updatedBlocks = [
        ...prevData.slice(0, index + 1),
        ...newBlocks,
        ...prevData.slice(index + 1),
      ];

      onBlocksChange(updatedBlocks);

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

      onBlocksChange(updatedBlocks);

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

          onBlocksChange(newData);
          return newData;
        }
      }

      onBlocksChange(newData);
      return newData;
    });
  };

  const removeBlock: TRemoveBlock = (removedBlockId) => {
    setData((prevData) => {
      const updatedBlocks = prevData.filter((block) => block.id !== removedBlockId);

      onBlocksChange(updatedBlocks);

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

          onBlocksChange(newData);
          return newData;
        }
      }

      onBlocksChange(newData);
      return newData;
    });
  };

  const setBlock: TSetBlock = (block) => {
    setData((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((b) => {
        if (b.id === block.id) return block;
        return b;
      });

      onBlocksChange(updatedBlocks);

      return updatedBlocks;
    });
  };

  const showInlineToolbar = (data: IInlineToolbar) => setInlineToolbar(data);

  const hideInlineToolbar = () => setInlineToolbar({});

  const mergeWithPrevBlock: TMergeWithPrevBlock = (currentBlockId, mergeCallback) => {
    setData((blocks) => {
      const updatedBlocks = [];

      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];

        // if block is not current block or is first block -> push it into updated blocks
        if (block.id !== currentBlockId || index === 0) {
          updatedBlocks.push(block);
          continue;
        }

        const currentBlock = block;
        const prevBlock = blocks[index - 1];

        // if current block type and previous block type are different ->
        // blocks are not mergeable and no need to update the state
        if (prevBlock.type !== currentBlock.type) return blocks;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mergedData = mergeCallback(prevBlock, currentBlock);
        const newBlock = createBlock(prevBlock.type, mergedData);
        updatedBlocks[index - 1] = newBlock;
      }

      return updatedBlocks;
    });
  };

  return {
    addBlock,
    moveBlockDown,
    moveBlockUp,
    removeBlock,
    setBlock,
    showInlineToolbar,
    hideInlineToolbar,
    addBlocks,
    mergeWithPrevBlock,
  };
};

export function generateToolsTagsMap(tools: TToolsMapper) {
  return Object.entries(tools).reduce<TToolsTagsMap>((tagsMap, [toolType, tool]) => {
    const { tags } = tool;
    if (!tags || !Array.isArray(tags)) return tagsMap;

    tags.forEach((tag) => {
      const toolTags = tagsMap[tag] ?? [];
      tagsMap[tag] = [...toolTags, toolType as TToolType];
    });

    return tagsMap;
  }, {});
}
