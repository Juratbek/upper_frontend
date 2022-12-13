/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef } from 'react';

import { IRecaptchaProps } from './Recaptcha.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    onloadCallback: () => void;
  }
}

export const Recaptcha: FC<IRecaptchaProps> = ({ siteKey, onSuccess, onExpired, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;

    window.onloadCallback = (): void => {
      // @ts-ignore
      grecaptcha.enterprise.render('html_element', {
        sitekey: siteKey,
        callback: onSuccess,
        'expired-callback': onExpired,
      });
    };

    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/enterprise.js?onload=onloadCallback&render=explicit&hl=ru';
    script.async = true;
    script.defer = true;

    ref.current.append(script);
  }, []);

  return (
    <div {...props}>
      <div id='html_element'></div>
      <div ref={ref} />
    </div>
  );
};
