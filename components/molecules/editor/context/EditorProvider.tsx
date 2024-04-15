import { FC, useCallback, useMemo, useState } from 'react';

import { Block } from '../block/Block';
import { IBlockNode } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { EditorContext } from './EditorContext';
import { IEditorContext, IEditorProviderProps } from './EditorContext.types';
import { bindEditorDataState } from './EditorContext.utils';

const mapper = EDITOR_TOOLS;

export const EditorProvider: FC<IEditorProviderProps> = ({
  children,
  content,
  isEditable = true,
}) => {
  const [data, setData] = useState(content.blocks);
  const [hoveredBlock, setHoveredBlock] = useState<IBlockNode>();

  const api = useMemo(() => bindEditorDataState(setData, mapper), []);

  const renderBlocks = useCallback(() => {
    return data.map((block) => {
      const Component = mapper[block.type]?.block;

      if (!Component) {
        console.error('Tool not found for ', block.type, block.data);
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
        tools: mapper,
        ...api,
        renderBlocks,
        hoveredBlock,
        isEditable,
      }) satisfies IEditorContext,
    [data, api, hoveredBlock, isEditable],
  );

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
};
