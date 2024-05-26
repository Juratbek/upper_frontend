import { FC, useCallback, useMemo, useState } from 'react';

import { Block } from '../block/Block';
import { IBlockData, IBlockNode } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { EditorContext } from './EditorContext';
import { IEditorContext, IEditorProviderProps, IInlineToolbar } from './EditorContext.types';
import { bindEditorDataState, generateToolsTagsMap } from './EditorContext.utils';
import { getEditorNavigationCallbacks } from './EditorNavigation.utils';

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

  const navigation = useMemo(() => getEditorNavigationCallbacks({ data }), [data]);

  const renderBlocks = useCallback(() => {
    return data.map((block) => {
      const Component = mapper[block.type]?.block;

      if (!Component) {
        console.error('Tool not found for ', block.type, block.data);
        return <div key={block.id}>default block</div>;
      }

      return (
        <Block {...block} key={block.id} onMouseEnter={setHoveredBlock} onFocus={setFocusedBlock}>
          <Component api={api} isEditable={isEditable} {...block} />
        </Block>
      );
    });
  }, [data, api]);

  const toolsTagsMap = useMemo(() => generateToolsTagsMap(mapper), [mapper]);

  const store = useMemo(
    () =>
      ({
        data,
        tools: mapper,
        ...api,
        ...navigation,
        renderBlocks,
        hoveredBlock,
        focusedBlock,
        isEditable,
        inlineToolbar,
        toolsTagsMap,
      }) satisfies IEditorContext,
    [data, api, hoveredBlock, focusedBlock, isEditable, inlineToolbar, toolsTagsMap, navigation],
  );

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
};
