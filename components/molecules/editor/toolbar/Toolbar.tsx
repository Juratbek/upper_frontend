import { useContext, useState } from 'react';

import { EditorContext } from '../context/EditorContext';
import { ActionButtons } from './action-buttons/ActionButtons';
import { SettingsPopover } from './settings-popover/SettingsPopover';
import classes from './Toolbar.module.scss';
import { ToolsPopover } from './tools-popover/ToolsPopover';

export const Toolbar = () => {
  const { hoveredBlock } = useContext(EditorContext);
  const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false);
  const [isSettingsPopoverOpen, setIsSettingsPopoverOpen] = useState(false);
  const toolbarPosition = hoveredBlock?.offsetTop;

  const toggleToolsPopover = () => {
    if (isSettingsPopoverOpen) setIsSettingsPopoverOpen(false);
    setIsToolsPopoverOpen((prev) => !prev);
  };

  const toggleSettingsPopover = () => {
    if (isToolsPopoverOpen) setIsToolsPopoverOpen(false);
    setIsSettingsPopoverOpen((prev) => !prev);
  };

  return (
    <div
      className={classes.toolbar}
      style={{
        top: toolbarPosition,
        display: toolbarPosition === undefined ? 'none' : 'block',
      }}
    >
      <div className={classes['toolbar-content']}>
        <ActionButtons onPlus={toggleToolsPopover} onSettings={toggleSettingsPopover} />
        <ToolsPopover open={isToolsPopoverOpen} close={toggleToolsPopover} />
        <SettingsPopover open={isSettingsPopoverOpen} close={toggleSettingsPopover} />
      </div>
    </div>
  );
};
