import { PlusIcon } from 'components/icons';
import { Link, Spinner } from 'components/lib';
import { useAppRouter, useTheme } from 'hooks';
import { FC, useCallback, useMemo } from 'react';
import { useCreateArticle } from 'store/clients/article';

import { leftButtons, rightButtons } from './BottomNavigation.constants';
import classes from './BottomNavigation.module.scss';
import { IButton } from './BottomNavigation.types';

export const BottomNavigation: FC = () => {
  const { push } = useAppRouter();
  const { themeColors } = useTheme();
  const { mutate: createArticle, isPending: isArticleBeingCreated } = useCreateArticle({
    onSuccess: ({ id }) => push(`/user/articles/${id}`),
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
          <PlusIcon width={44} height={44} color={themeColors.icon} />
        </span>
      </button>
    );
  }, [isArticleBeingCreated]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {leftButtons.map((button, index) => (
          <NavigationButton key={index} {...button} color={themeColors.icon} />
        ))}
        {createButton}
        {rightButtons.map((button, index) => (
          <NavigationButton key={index} {...button} color={themeColors.icon} />
        ))}
      </div>
    </div>
  );
};

const NavigationButton: FC<IButton & { color: string }> = (button) => (
  <Link href={button.path} className={classes['navigation-button']}>
    <span className={classes.icon}>
      <button.icon width={24} height={24} color={button.color} />
    </span>
    {Boolean(button.label) && <span className={classes.label}>{button.label}</span>}
  </Link>
);
