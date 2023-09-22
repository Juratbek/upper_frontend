import { useTheme } from 'hooks';
import { FC } from 'react';
import { ITelegramChannel } from 'types';
import { ICONS } from 'variables';

const TelegramChannelIcon = ICONS.telegramChannel;

export const ConnectedTelegramChannels: FC<{ channels: ITelegramChannel[] }> = ({ channels }) => {
  const { themeColors } = useTheme();

  return (
    <div>
      <p>Maqolangiz quidagi Telegram kanallarida ham joylanadi</p>
      {channels?.map((channel) => (
        <div key={channel.id} className='d-flex f-gap-1'>
          <TelegramChannelIcon color={themeColors.icon} />
          <p className='m-0'>{channel.name}</p>
        </div>
      ))}
    </div>
  );
};
