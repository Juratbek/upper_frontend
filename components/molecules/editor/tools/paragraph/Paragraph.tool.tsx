import { FC, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';

import { IBlockNode } from '../../instance/Editor.types';
import { IToolProps } from '../tool.types';
import classes from './Paragraph.module.scss';

export const Paragraph: FC<IToolProps<{ text: string }>> = ({
  data,
  isEditable,
  api,
  ...props
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!data) ref.current?.focus();
  }, []);

  const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
    (event) => {
      if (!ref.current) return;

      const { code, metaKey: isMetaKey } = event;
      if (code === 'Enter' && isMetaKey) {
        const node = {
          ...ref.current,
          ...props,
          data,
        } satisfies IBlockNode;

        api.addBlock('paragraph', node);
      }
    },
    [data, props],
  );

  return (
    <p
      onKeyDown={keydownHandler}
      className={classes.paragraph}
      ref={ref}
      contentEditable={isEditable}
      dangerouslySetInnerHTML={{ __html: data?.text ?? '' }}
    />
  );
};
