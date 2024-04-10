import React, { FC, useEffect, useRef } from 'react';

import { IToolProps } from '../tool.types';
import classes from './Header.module.scss';
import { THeaderLevel } from './Header.types';

export const Header: FC<IToolProps<{ level: THeaderLevel; text: string }>> = ({
  data,
  isEditable,
}) => {
  const { level = 2, text } = data ?? { level: 1, text: '' };
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!data) ref.current?.focus();
  }, []);

  return React.createElement(
    `h${level}`,
    { contentEditable: isEditable, className: classes.heading, ref },
    text,
  );
};
