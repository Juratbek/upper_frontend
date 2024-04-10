import { FC } from 'react';
import { getClassName } from 'utils';

import { useEditorContext } from '../../context/useEditorContext';
import { TToolType } from '../../tools/tool.types';
import { Item } from './item/Item';
import classes from './Popover.module.scss';

export const Popover: FC<{ open: boolean; close: VoidFunction }> = ({ open, close }) => {
  const { tools, addBlock, hoveredBlock } = useEditorContext();

  const clickHandler = (type: TToolType) => {
    if (!hoveredBlock) {
      console.error("Tooltip shouldn't be shown if there is no hovered block");
      return;
    }
    addBlock(type, hoveredBlock);
    close();
  };

  const toolTypes = Object.keys(tools) as TToolType[];

  return (
    <div className={getClassName(classes.popover, open && classes.open)}>
      <div className={classes.list}>
        {toolTypes.map((type) => {
          const tool = tools[type];
          return <Item onClick={clickHandler} {...tool} key={tool.toolbar.text} type={type} />;
        })}
      </div>
    </div>
  );
};
