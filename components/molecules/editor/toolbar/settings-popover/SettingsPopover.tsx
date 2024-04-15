import { FC, useMemo } from 'react';

import { useEditorContext } from '../../context';
import { IToolbarSetting } from '../../tools/tool.types';
import { Item, Popover } from '../popover/Popover';
import { useSettings } from './SettingsPopover.hooks';
import cls from './SettingsPopover.module.scss';

export const SettingsPopover: FC<{ open: boolean; close: VoidFunction }> = ({ open, close }) => {
  const buttons = useSettings();
  const context = useEditorContext();

  const toolSettings: IToolbarSetting[] = useMemo(() => {
    const { tools, hoveredBlock } = context;
    if (!hoveredBlock) return [];
    return tools[hoveredBlock.type].settings ?? [];
  }, [context.hoveredBlock, context.tools]);

  const itemClickHandler = (item: IToolbarSetting) => {
    item.onClick(context);
    close();
  };

  return (
    <Popover open={open}>
      <div className={cls.list}>
        {toolSettings.concat(buttons).map((item) => (
          <Item
            active={item.active?.(context)}
            key={item.text}
            icon={item.icon}
            className={item.className}
            onClick={() => itemClickHandler(item)}
          >
            {item.text}
          </Item>
        ))}
      </div>
    </Popover>
  );
};
