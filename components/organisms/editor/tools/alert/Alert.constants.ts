import { IconWarning } from '@codexteam/icons';

import { ITool } from '../tool.types';
import { AlertSettings } from './Alert.settings';
import { Alert } from './Alert.tool';
import { IAlertData } from './Alert.types';

export const AlertTool: ITool = {
  toolbar: {
    text: 'Ogohlantiruvchi',
    icon: IconWarning,
  },
  shortcuts: ['o'],
  initialData: { message: '', type: 'info' } satisfies IAlertData,
  settings: AlertSettings,
  block: Alert,
  inlineToolEnabled: true,
};
