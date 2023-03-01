import React from 'react';

export interface IArticleSharePopupProps {
  id: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  right?: number;
}
