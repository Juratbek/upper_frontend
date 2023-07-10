import { useRouter } from 'next/router';
import { FC } from 'react';

export const TutorialPage: FC = () => {
  const {
    query: { itemId },
  } = useRouter();

  return <div>{itemId}</div>;
};
