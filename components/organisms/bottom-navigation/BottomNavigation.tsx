import { Link, Spinner } from 'components/lib';
import { useAppRouter } from 'hooks';
import { FC, useCallback, useMemo } from 'react';
import { useCreateArticle } from 'store/clients/article';
import { ICONS } from 'variables/icons';

import { leftButtons, rightButtons } from './BottomNavigation.constants';
import classes from './BottomNavigation.module.scss';
import { IButton } from './BottomNavigation.types';

const Plus = ICONS.plus;

export const BottomNavigation: FC = () => {
  const { push } = useAppRouter();
  const { mutate: createArticle, isPending: isArticleBeingCreated } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });

  const createArticleHandler = useCallback(() => createArticle(), []);

  const createButton = useMemo(() => {
    if (isArticleBeingCreated)
      return (
        <button className={classes['add-btn']} onClick={createArticleHandler} disabled>
          <Spinner />
        </button>
      );

    return (
      <button className={classes['add-btn']} onClick={createArticleHandler}>
        <span className={classes.circle}>
          <Plus width={44} height={44} />
        </span>
      </button>
    );
  }, [isArticleBeingCreated]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {leftButtons.map((button, index) => (
          <NavigationButton key={index} {...button} />
        ))}
        {createButton}
        {rightButtons.map((button, index) => (
          <NavigationButton key={index} {...button} />
        ))}
      </div>
    </div>
  );
};

const NavigationButton: FC<IButton> = (button) => (
  <Link href={button.path} className={classes['navigation-button']}>
    <span className={classes.icon}>
      <button.icon width={24} height={24} />
    </span>
    {Boolean(button.label) && <span className={classes.label}>{button.label}</span>}
  </Link>
);
