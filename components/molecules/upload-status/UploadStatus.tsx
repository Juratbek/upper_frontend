import { UseMutationResult } from '@tanstack/react-query';
import { UploadErrorIcon, UploadingIcon, UploadSuccessIcon } from 'components/icons';
import { useTheme } from 'hooks';
import { memo } from 'react';

const size = 30;

export const UploadStatus = memo(function Component({ status }: Pick<UseMutationResult, 'status'>) {
  const { themeColors } = useTheme();

  if (status === 'pending')
    return <UploadingIcon width={size} height={size} color={themeColors.icon} />;
  if (status === 'success') return <UploadSuccessIcon width={size} height={size} />;
  if (status === 'error') return <UploadErrorIcon width={size} height={size} />;

  return null;
});
