import { ThemeContext } from 'context';
import Image, { ImageProps } from 'next/image';
import { FC, useContext } from 'react';

import classes from './Lordicon.module.scss';

interface ILordiconProps extends ImageProps {
  hidden?: boolean;
  className?: string;
}

export const Lordicon: FC<ILordiconProps> = ({ className, hidden, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={className}>
      <Image {...props} src={`/icons/congrats-${theme}.apng`} />
      {!hidden && (
        <a className={classes.link} target='_blank' href='https://lordicon.com/' rel='noreferrer'>
          Animated icons by Lordicon.com
        </a>
      )}
    </div>
  );
};
