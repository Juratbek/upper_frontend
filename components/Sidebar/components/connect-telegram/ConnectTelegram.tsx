import { Button, Divider } from 'components/lib';
import { useAuth, useTheme } from 'hooks';
import { FC, useEffect } from 'react';
import { useLazyGetTelegramConnectionStatusQuery } from 'store/apis';
import { ICONS } from 'variables';

const TelegramIcon = ICONS.telegramColored;

export const ConnectTelegram: FC = () => {
  const [fetchConnectionStatus, fetchConnectionStatusRes] =
    useLazyGetTelegramConnectionStatusQuery();
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      fetchConnectionStatus();
    }
  }, [isAuthenticated]);

  if (fetchConnectionStatusRes.isSuccess && fetchConnectionStatusRes?.data.isConnected !== true) {
    const { data } = fetchConnectionStatusRes;

    return (
      <div className='text-center'>
        <Divider className='my-2' />
        <TelegramIcon color={themeColors.icon} width={40} height={40} />
        <p>Telegram botimiz orqali yangi maqolalar haqida habarlar oling</p>
        <a
          href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=${data.username}`}
          target='_blank'
          rel='noreferrer'
        >
          <Button className='d-flex w-100 justify-content-center align-items-center f-gap-1'>
            <TelegramIcon color={themeColors.icon} width={20} height={20} />
            Telegram bilan ulash
          </Button>
        </a>
      </div>
    );
  }

  return null;
};
