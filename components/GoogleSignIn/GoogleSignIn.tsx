import Script from 'next/script';
import { FC } from 'react';

export const GoogleSignIn: FC = () => {
  const onLoadHandler = (): void => {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: console.log,
      onfailure: (err: Record<string, string>) => {
        console.log('🚀 ~ file: LoginModal.tsx ~ line 85 ~ onLoadHandler ~ err', err);
      },
    });
  };

  return (
    <>
      <div id='my-signin2'>sign in</div>
      <Script
        src='https://apis.google.com/js/platform.js'
        async
        onLoad={onLoadHandler}
        defer
      ></Script>
    </>
  );
};
