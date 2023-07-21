import { Button } from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useRef } from 'react';
import { useLoginWithTelegramMutation } from 'store/apis';
import { ITelegramUser } from 'types';

import { ITelegramLoginButtonProps } from './TelegramLoginButton.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    TelegramLoginWidget: {
      onAuth: (user: ITelegramUser) => void;
    };
  }
}

export const TelegramLoginButton: FC<ITelegramLoginButtonProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loginWithTelegram, loginWithTelegramRes] = useLoginWithTelegramMutation();
  const { authenticate } = useAuth();

  const {
    shouldUsePic = true,
    botName,
    className,
    buttonSize = 'large',
    onAuth,
    cornerRadius,
    shouldRequestAccess = true,
    isLoading,
  } = props;

  useEffect(() => {
    const { data, isSuccess } = loginWithTelegramRes;
    if (isSuccess) {
      authenticate(data);
      console.log('🚀 ~ file: TelegramLoginButton.tsx:40 ~ useEffect ~ onAuth', onAuth);
      onAuth?.(data);
    }
  }, [loginWithTelegramRes.data]);

  useEffect(() => {
    if (ref.current === null) return;

    window.TelegramLoginWidget = {
      onAuth: (user: ITelegramUser) => loginWithTelegram(user),
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?4';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute('data-radius', cornerRadius.toString());
    }

    if (shouldRequestAccess) {
      script.setAttribute('data-request-access', 'write');
    }

    script.setAttribute('data-userpic', shouldUsePic.toString());
    script.setAttribute('data-onauth', 'TelegramLoginWidget.onAuth(user)');
    script.async = true;

    ref.current.appendChild(script);
  }, [botName, buttonSize, cornerRadius, onAuth, shouldRequestAccess, shouldUsePic, ref]);

  return loginWithTelegramRes.isLoading || isLoading ? (
    <Button loading={true} color='blue' className={`w-100 ${className}`} />
  ) : (
    <div ref={ref} id='test' className={className} />
  );
};
