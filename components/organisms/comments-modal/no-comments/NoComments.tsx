import Image from 'next/image';

import classes from './NoComments.module.scss';

export const NoComments = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <h3 className={classes.text}>O&apos;z fikringizni yozib qoldiring!</h3>
      <Image alt='comments' width={142} height={99} src={'/icons/comments.svg'} />
    </div>
  );
};
