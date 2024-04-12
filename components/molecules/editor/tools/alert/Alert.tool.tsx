import { FC } from 'react';

import { IToolProps } from '../tool.types';
import { IAlertData } from './Alert.types';

export const Alert: FC<IToolProps<IAlertData>> = ({ data }) => {
  return <div>{data.message}</div>;
};
