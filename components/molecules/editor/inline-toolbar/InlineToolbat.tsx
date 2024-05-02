import { ButtonHTMLAttributes, useState } from 'react';
import { Override } from 'utils';

import { useEditorContext } from '../context';
import cls from './InlineToolbar.module.scss';
import { IInlineTool } from './InlineToolbar.types';
import { useInlineTools } from './useInlineTools';

export const InlineToolbar = () => {
  const { inlineToolbar } = useEditorContext();
  const [activeTool, setActiveTool] = useState<IInlineTool>();
  const tools = useInlineTools();

  const itemClickHandler = (tool: IInlineTool) => {
    tool.callback?.();
    setActiveTool((prevTool) => {
      if (prevTool) return undefined;
      return tool;
    });
  };

  const closePopover = () => setActiveTool(undefined);

  return (
    <div
      className={cls.root}
      style={inlineToolbar.position ? { ...inlineToolbar.position } : { display: 'none' }}
    >
      <div className={cls['tools']}>
        {tools.map((tool, index) => (
          <Item onClick={() => itemClickHandler(tool)} key={index}>
            {tool.icon}
          </Item>
        ))}
      </div>
      {activeTool?.renderPopover && (
        <div className={cls.popover}>{activeTool.renderPopover({ close: closePopover })}</div>
      )}
    </div>
  );
};

const Item = ({
  children,
  ...props
}: Override<ButtonHTMLAttributes<HTMLButtonElement>, { children: string }>) => {
  return <button {...props} className={cls.item} dangerouslySetInnerHTML={{ __html: children }} />;
};
