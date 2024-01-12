import Image from 'next/image';
import { FC } from 'react';

import classes from './LogosBox.module.scss';

const paths = ['vs_code.png', 'flutter.png', 'adobe.png', 'figma.png', 'chat-gpt.png', 'js.png'];

export const LogosBox: FC = () => (
  <div className={classes.container}>
    {paths.map((path) => (
      <Image key={path} width={120} height={120} src={`/logos/${path}`} alt='vs code' />
    ))}
  </div>
);
