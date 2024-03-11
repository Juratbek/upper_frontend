import { useAuth } from 'hooks';
import { FC } from 'react';

import AuthButton from '../auth-button';

export const NoArticle: FC<{ label: string }> = ({ label }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h3>{label} uchun maqolalar topilmadi</h3>
      <p>{label} mavzusida maqolalar yozing va bilim ulashing</p>
      {isAuthenticated === false && <AuthButton>Maqola yozish</AuthButton>}
    </div>
  );
};
