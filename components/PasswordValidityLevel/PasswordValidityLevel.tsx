import { useEffect, useState } from 'react';

import { PASSWORD_VALIDITY_REQUIREMENTS } from './PasswordValidityLevel.constants';
import classes from './PasswordValidityLevel.module.scss';
import { IPasswordValidityLevelProps, TValidityRequirement } from './PasswordValidityLevel.types';

export function PasswordValidityLevel({ password }: IPasswordValidityLevelProps): JSX.Element {
  const [passedRequirements, setPassedRequirements] =
    useState<Record<Partial<TValidityRequirement>, boolean>>();

  useEffect(() => {
    setPassedRequirements({
      length: password?.length >= 8,
      upperLowerCase: /[A-ZА-Я]/.test(password) && /[a-zа-я]/.test(password),
      numberContains: /[0-9]/.test(password),
    });
  }, [password]);

  return (
    <div>
      {Object.keys(PASSWORD_VALIDITY_REQUIREMENTS).map((requirement) => {
        const text = PASSWORD_VALIDITY_REQUIREMENTS[requirement as TValidityRequirement];
        const isPassed = passedRequirements?.[requirement as TValidityRequirement];
        return (
          <div key={requirement} className={isPassed ? 'text-green' : ''}>
            <p className={classes['password-requirement']}>
              {isPassed ? <span>&#10003;</span> : <span>&#10005;</span>}&nbsp;
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
