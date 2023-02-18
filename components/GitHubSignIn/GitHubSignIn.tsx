import { Button } from 'components/lib';
import { useAuth, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useContinueWithGitHubMutation } from 'store/apis';
import { ICONS } from 'variables';

import classes from './GitHubSignIn.module.scss';
import { IGitHubSignInProps } from './GitHubSignIn.types';

const GitHubIcon = ICONS.github;

export const GitHubSignIn: FC<IGitHubSignInProps> = ({
  className,
  text = "GitHub orqali ro'yxatdan o'tish",
}) => {
  const [continueWithGitHub] = useContinueWithGitHubMutation();
  const { authenticate } = useAuth();
  const { themeColors } = useTheme();
  const {
    query: { code },
  } = useRouter();

  useEffect(() => {
    if (typeof code === 'string') {
      continueWithGitHub(code).unwrap().then(authenticate);
    }
  }, [code]);

  return (
    <a
      href='https://github.com/login/oauth/authorize?scope=user:email&client_id=aee8949321e01c883496'
      target='_blank'
      rel='noreferrer'
    >
      <Button className={`${classes.btn} ${className}`}>
        <span className={classes.icon}>
          <GitHubIcon color={themeColors.icon} />
        </span>
        {text}
      </Button>
    </a>
  );
};
