import { Input } from 'components/form';
import { useTheme } from 'hooks';
import { Dispatch, FC, SetStateAction } from 'react';
import { ITelegramChannel } from 'types';
import { ICONS } from 'variables';

const TelegramChannelIcon = ICONS.telegramChannel;

export const ConnectedTelegramChannels: FC<{
  channels: ITelegramChannel[];
  onSelectionChange: Dispatch<SetStateAction<number[]>>;
}> = ({ channels, onSelectionChange }) => {
  const { themeColors } = useTheme();

  const checkboxChangeHandler = (id: number) => (): void => {
    onSelectionChange((prev) => [...prev, id]);
  };

  return (
    <div className='mb-2'>
      <p className='mb-0'>Maqolangiz quidagi Telegram kanallarida ham joylanadi</p>
      <p className='mt-0 text-warning'>Bu imkoniyat test rejimida</p>
      {channels?.map((channel) => (
        <div key={channel.id} className='d-flex f-gap-1 align-items-center'>
          <Input type='checkbox' defaultChecked onChange={checkboxChangeHandler(channel.id)} />
          <TelegramChannelIcon color={themeColors.icon} />
          <p className='m-0'>{channel.name}</p>
        </div>
      ))}
    </div>
  );
};
