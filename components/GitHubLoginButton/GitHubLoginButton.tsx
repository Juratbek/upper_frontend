import { Button } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import { useLoginWithTelegramMutation } from 'store/apis';
import { useGetAcessTokenByCodeMutation } from 'store/apis/auth';
import { ITelegramUser } from 'types';
import { ICONS } from 'variables';

import { IGitHubLoginButtonProps } from './GitHubLoginButton.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    TelegramLoginWidget: {
      onAuth: (user: ITelegramUser) => void;
    };
  }
}

const GitHubIcon = ICONS.github;

export const GitHubLoginButton: FC<IGitHubLoginButtonProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loginWithTelegram, loginWithTelegramRes] = useLoginWithTelegramMutation();
  const { authenticate } = useAuth();
  const [getAccesTokenByCode, getAccesTokenByCodeRes] = useGetAcessTokenByCodeMutation();

  const {
    query: { code },
  } = useRouter();

  const getAccessTooken = async (code: string): Promise<void> => {
    const res = await getAccesTokenByCode({ code }).unwrap();
    console.log('🚀 ~ file: GitHubLoginButton.tsx:36 ~ getAccessTooken ~ res', res);
  };

  useEffect(() => {
    if (code) {
      getAccessTooken(code + '');
    }
  }, [code]);

  return (
    <a
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=http://127.0.0.1`}
    >
      <GitHubIcon />
    </a>
  );
};
