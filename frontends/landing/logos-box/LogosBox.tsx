import { useDevice } from 'hooks';
import Image from 'next/image';
import { FC, useMemo } from 'react';

import classes from './LogosBox.module.scss';

export const LogosBox: FC = () => {
  const { isDesktop } = useDevice();
  const paths = useMemo(() => {
    if (isDesktop)
      return ['vs_code.png', 'flutter.png', 'adobe.png', 'figma.png', 'chat-gpt.png', 'js.png'];
    return ['vs_code.png', 'chat-gpt.png', 'js.png', 'adobe.png'];
  }, []);

  return (
    <div className={classes.container}>
      {paths.map((path, index) => (
        <Image
          className={classes.image}
          key={path}
          width={120}
          height={120}
          src={`/logos/${path}`}
          alt='vs code'
          // @ts-ignore
          style={{ '--i': index }}
        />
      ))}
    </div>
  );
};
