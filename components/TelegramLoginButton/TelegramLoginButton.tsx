import { FC, useEffect, useRef } from 'react';
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

  const {
    shouldUsePic = true,
    botName,
    className,
    buttonSize = 'large',
    onAuth,
    cornerRadius,
    shouldRequestAccess = true,
  } = props;

  useEffect(() => {
    if (ref.current === null) return;

    window.TelegramLoginWidget = {
      onAuth: (user: ITelegramUser) => onAuth(user),
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

  return <div ref={ref} className={className} />;
};
