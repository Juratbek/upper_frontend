import { UseMutationResult } from '@tanstack/react-query';
import { UploadErrorIcon, UploadingIcon, UploadSuccessIcon } from 'components/icons';
import { Tooltip } from 'components/lib';
import { useTheme } from 'hooks';
import { memo } from 'react';

const size = 30;

export const UploadStatus = memo(function Component({
  status,
  error,
}: Pick<UseMutationResult, 'status' | 'error'>) {
  const { themeColors } = useTheme();

  if (status === 'pending')
    return (
      <Tooltip tooltip='Maqola serverga yuklanmoqda'>
        <UploadingIcon width={size} height={size} color={themeColors.icon} />
      </Tooltip>
    );

  if (status === 'success') return <UploadSuccessIcon width={size} height={size} />;

  if (status === 'error') {
    const errorMessage = error?.message ?? 'Maqolani saqlashda xatolik yuz berdi';
    return (
      <Tooltip tooltip={errorMessage} position='bottom'>
        <UploadErrorIcon width={size} height={size} />
      </Tooltip>
    );
  }

  return null;
});
