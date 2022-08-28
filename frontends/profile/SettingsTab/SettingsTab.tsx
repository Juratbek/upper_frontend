import { Avatar, Divider, FileInput, Input, Textarea } from 'components';
import { FC } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

const Telegram = ICONS[ICON_TYPES.telegram];

export const SettingsTab: FC = () => {
  return (
    <div className='px-2'>
      <h2>Blogingiz haqida</h2>
      <Divider />
      <div className='d-flex'>
        <div className='w-50'>
          <div>
            <Avatar imgUrl='' className='my-2' size='extra-large' />
            <FileInput />
          </div>
          <div>
            <h4 className='mb-1'>Nomi</h4>
            <Input defaultValue='Samandar Boymurodov' onChange={console.log} />
          </div>
          <div>
            <h4 className='mb-1'>Bio</h4>
            <Textarea defaultValue='Samandar Boymurodov' onChange={console.log} />
          </div>
        </div>
        <div>
          <h4 className='mb-1'>Ijtimoiy tarmoqlar</h4>
          <table>
            <tbody>
              <tr>
                <td style={{ width: 30, height: 30 }}>
                  <Telegram />
                </td>
                <td style={{ width: 30, height: 30 }}>
                  <Telegram />
                </td>
              </tr>
              <tr>
                <td>{/* <a href=""></a> */}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
