import { Button } from 'components/lib';
import { useTheme } from 'hooks';
import { FC, useEffect } from 'react';
import { useAppSelector } from 'store';
import { getIsGoogleScriptLoaded } from 'store/states';

import { IGoogleSignInProps } from './GoogleSignIn.types';

export const GoogleSignIn: FC<IGoogleSignInProps> = (props) => {
  const { theme } = useTheme();
  const isGoogleScriptLoaded = useAppSelector(getIsGoogleScriptLoaded);

  useEffect(() => {
    isGoogleScriptLoaded &&
      google.accounts.id.renderButton(document.querySelector(`#${props.id}`), {
        theme: theme === 'dark' ? 'filled_black' : 'outline',
        shape: 'pill',
        width: props.width || 332,
        locale: 'uz',
      });
  }, [isGoogleScriptLoaded]);

  return <Button id={props.id} type='button' style={{ padding: 0 }} />;
};
