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

    const renderRecaptcha = (): void => {
      // @ts-ignore
      const widgetId = grecaptcha.enterprise.render(id, {
        sitekey: siteKey,
        callback: onSuccess,
        'expired-callback': onExpired,
      });
      setWidgetId(widgetId);
      setIsLoading(false);
    };

    const renderTimeoutedRecaptcha = (tryingTimes: number): (() => void) => {
      let failureCount = 0;
      return function inner() {
        setTimeout(() => {
          try {
            renderRecaptcha();
          } catch (e) {
            failureCount++;

            if (failureCount < tryingTimes) {
              inner();
            } else {
              console.error(e);
            }
          }
        }, 3000);
      };
    };

    useEffect(() => {
      if (!isScriptLoaded) return;

      renderTimeoutedRecaptcha(10)();
    }, [isScriptLoaded]);

    useImperativeHandle(
      ref,
      () => {
        return {
          reset: (): void => {
            if (typeof widgetId === 'number') {
              // @ts-ignore
              grecaptcha.enterprise.reset(widgetId);
              onExpired?.();
            }
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
