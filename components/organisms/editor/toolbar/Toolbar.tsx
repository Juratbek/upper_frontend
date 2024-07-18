import { useClickOutside, useTheme } from 'hooks';
import { CSSProperties, useRef, useState } from 'react';

import { useEditorContext } from '../context';
import { ActionButtons } from './action-buttons/ActionButtons';
import { SettingsPopover } from './settings-popover/SettingsPopover';
import classes from './Toolbar.module.scss';
import { ToolsPopover } from './tools-popover/ToolsPopover';

export const Toolbar = () => {
  const { hoveredBlock } = useEditorContext();
  const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false);
  const [isSettingsPopoverOpen, setIsSettingsPopoverOpen] = useState(false);
  const toolbarPosition = hoveredBlock?.offsetTop;
  const { themeColors } = useTheme();
  const toolsPopoverRef = useRef<HTMLDivElement>(null);
  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const closeAllPopovers = () => {
    setIsSettingsPopoverOpen(false);
    setIsToolsPopoverOpen(false);
  };

  useClickOutside(closeAllPopovers, '.action-button');

  const toggleToolsPopover = () => {
    if (isSettingsPopoverOpen) setIsSettingsPopoverOpen(false);
    setIsToolsPopoverOpen((prev) => !prev);
  };

  const toggleSettingsPopover = () => {
    if (isToolsPopoverOpen) setIsToolsPopoverOpen(false);
    setIsSettingsPopoverOpen((prev) => !prev);
  };

  const getToolsPopoverStyles = (): CSSProperties => {
    const actionButtons = actionButtonsRef.current;
    const toolsPopoverElement = toolsPopoverRef.current;

    if (!actionButtons || !toolsPopoverElement)
      return {
        transform: 'translateY(-13%)',
      };

    const actionButtonsRect = actionButtons.getBoundingClientRect();
    const toolsPopoverRect = toolsPopoverElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const toolsPopoverHeight = toolsPopoverRect.height || 360;

    // Check if there is enough space below the parent element
    if (actionButtonsRect.bottom + toolsPopoverHeight > viewportHeight) {
      // Not enough space, position it above the parent element
      return {
        transform: 'translateY(-13%)',
      };
    } else {
      return {};
    }
  };

  return (
    <div
      className={classes.toolbar}
      role='toolbar'
      style={{
        top: (toolbarPosition ?? 0) - 10,
        display: toolbarPosition === undefined ? 'none' : 'block',
      }}
    >
      <div className={classes['toolbar-content']}>
        <ActionButtons
          ref={actionButtonsRef}
          color={themeColors.icon}
          onPlus={toggleToolsPopover}
          onSettings={toggleSettingsPopover}
        />
        <ToolsPopover
          ref={toolsPopoverRef}
          open={isToolsPopoverOpen}
          style={getToolsPopoverStyles()}
          close={toggleToolsPopover}
        />
        <SettingsPopover open={isSettingsPopoverOpen} close={toggleSettingsPopover} />
      </div>
    </div>
  );
};
