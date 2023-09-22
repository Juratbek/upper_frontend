import { FC } from 'react';
import { ITelegramChannel } from 'types';

export const ConnectedTelegramChannels: FC<{ channels: ITelegramChannel[] }> = ({ channels }) => {
  return (
    <div>
      {channels?.map((channel) => (
        <p key={channel.id}>{channel.name}</p>
      ))}
    </div>
  );
};
