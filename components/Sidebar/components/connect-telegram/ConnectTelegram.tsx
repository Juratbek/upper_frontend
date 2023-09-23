import { Button, Divider } from 'components/lib';
import { useAuth, useTheme } from 'hooks';
import { FC, useCallback, useEffect } from 'react';
import { useLazyGetAuthCodeQuery, useLazyGetTelegramConnectionStatusQuery } from 'store/apis';
import { ICONS } from 'variables';

const TelegramIcon = ICONS.telegramColored;

export const ConnectTelegram: FC = () => {
  const [fetchConnectionStatus, fetchConnectionStatusRes] =
    useLazyGetTelegramConnectionStatusQuery();
  const [fetchAuthCode] = useLazyGetAuthCodeQuery();
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      fetchConnectionStatus();
    }
  }, [isAuthenticated]);

  const connectHandler = useCallback(async () => {
    try {
      const code = await fetchAuthCode().unwrap();
      window.open(`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=${code}`, '_blank');
    } catch (e) {
      alert(e);
    }
  }, [fetchAuthCode]);

  if (fetchConnectionStatusRes.isSuccess && fetchConnectionStatusRes.data !== true) {
    return (
      <div className='text-center'>
        <Divider className='my-2' />
        <TelegramIcon color={themeColors.icon} width={40} height={40} />
        <p>Telegram botimiz orqali yangi maqolalar haqida xabarlar oling</p>
        <Button
          onClick={connectHandler}
          className='d-flex w-100 justify-content-center align-items-center f-gap-1'
        >
          <TelegramIcon color={themeColors.icon} width={20} height={20} />
          Telegram bilan ulash
        </Button>
      </div>
    );
  }

  return null;
};
