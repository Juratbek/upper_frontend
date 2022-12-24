/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Spinner } from 'components';
import { useAuth } from 'hooks';
import { forwardRef, useEffect, useId, useImperativeHandle, useState } from 'react';

import { IRecaptchaProps } from './Recaptcha.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    onloadCallback: () => void;
  }
}

const googleScriptId = 'google-racaptcha';

export const Recaptcha = forwardRef<{ reset: () => void }, IRecaptchaProps>(
  ({ siteKey, onSuccess, onExpired, ...props }, ref) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [widgetId, setWidgetId] = useState<null | number>(null);

    const id = useId();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isScriptLoaded) return;

      setTimeout(() => {
        // @ts-ignore
        const widgetId = grecaptcha.enterprise.render(id, {
          sitekey: siteKey,
          callback: onSuccess,
          'expired-callback': onExpired,
        });
        setWidgetId(widgetId);
        setIsLoading(false);
      }, 3000);
    }, [isScriptLoaded]);

    useImperativeHandle(
      ref,
      () => {
        return {
          reset: (): void => {
            // @ts-ignore
            typeof widgetId === 'number' && grecaptcha.enterprise.reset(widgetId);
          },
        };
      },
      [widgetId],
    );

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
        {isLoading && <Spinner color='light' />}
        <div id={id} />
      </div>
    );
  },
);

Recaptcha.displayName = 'Recaptcha';
