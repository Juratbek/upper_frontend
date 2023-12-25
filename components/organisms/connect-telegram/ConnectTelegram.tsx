import { Button } from 'components/lib';
import { useAuth, useTheme } from 'hooks';
import { FC, useCallback } from 'react';
import { useGetAuthCode } from 'store/clients/blog';
import { useGetTelegramConnectionStatus } from 'store/clients/telegram';
import { ICONS } from 'variables';

const TelegramIcon = ICONS.telegramColored;

export const ConnectTelegram: FC = () => {
  const { themeColors } = useTheme();
  const { isAuthenticated } = useAuth();
  const { refetch: fetchAuthCode, ...fetchAuthCodeRes } = useGetAuthCode();
  const fetchConnectionStatusRes = useGetTelegramConnectionStatus({
    enabled: Boolean(isAuthenticated),
  });

  const connectHandler = useCallback(async () => {
    try {
      const code = (await fetchAuthCode()).data;
      window.open(`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=${code}`, '_blank');
    } catch (e) {
      alert(e);
    }
  }, [fetchAuthCode]);

  if (fetchConnectionStatusRes.isSuccess && fetchConnectionStatusRes.data !== true) {
    return (
      <div className='text-center'>
        <TelegramIcon color={themeColors.icon} width={40} height={40} />
        <p>Telegram botimiz orqali yangi maqolalar haqida xabarlar oling</p>
        <Button
          onClick={connectHandler}
          className='d-flex w-100 justify-content-center align-items-center f-gap-1'
          loading={fetchAuthCodeRes.isLoading}
          color='tertiary'
        >
          <TelegramIcon color={themeColors.icon} width={20} height={20} />
          Telegram bilan ulash
        </Button>
      </div>
    );
  }

  return null;
};
