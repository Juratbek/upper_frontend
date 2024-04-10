import { useContext, useState } from 'react';

import { EditorContext } from '../context/EditorContext';
import { Plus } from './plus/Plus';
import { Popover } from './popover/Popover';
import classes from './Toolbar.module.scss';

export const Toolbar = () => {
  const { hoveredBlock } = useContext(EditorContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toolbarPosition = hoveredBlock?.offsetTop;

  const togglePopover = () => setIsPopoverOpen((prev) => !prev);

  return (
    <div
      className={classes.toolbar}
      style={{
        top: toolbarPosition,
        display: toolbarPosition === undefined ? 'none' : 'block',
      }}
    >
      <div className={classes['toolbar-content']}>
        <Plus onClick={togglePopover} />
        <Popover open={isPopoverOpen} close={togglePopover} />
      </div>
    </div>
  );
};
