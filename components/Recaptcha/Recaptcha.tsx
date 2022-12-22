/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Spinner } from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useId, useState } from 'react';

import { IRecaptchaProps } from './Recaptcha.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    onloadCallback: () => void;
  }
}

const googleScriptId = 'google-racaptcha';

export const Recaptcha: FC<IRecaptchaProps> = ({ siteKey, onSuccess, onExpired, ...props }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoding, setIsLoading] = useState(true);
  const id = useId();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isScriptLoaded) return;

    setTimeout(() => {
      // @ts-ignore
      grecaptcha.enterprise.render(id, {
        sitekey: siteKey,
        callback: onSuccess,
        'expired-callback': onExpired,
      });
      setIsLoading(false);
    }, 3000);
  }, [isScriptLoaded]);

  useEffect(() => {
    if (isAuthenticated) return;

    const head = document.head;
    const recaptchaScript = head.querySelector(`#${googleScriptId}`);
    if (recaptchaScript) {
      return setIsScriptLoaded(true);
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=explicit&hl=ru';
    script.id = googleScriptId;
    script.async = true;
    script.defer = true;
    script.onload = (): void => setIsScriptLoaded(true);
    head.append(script);
  }, []);

  return (
    <div {...props}>
      {isLoding && <Spinner color='light' />}
      <div id={id} />
    </div>
  );
};
