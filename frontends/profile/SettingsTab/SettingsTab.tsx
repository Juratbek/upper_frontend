import { Avatar, Divider, FileInput, Input, Textarea } from 'components';
import { FC } from 'react';
import { IBlog } from 'types';
import { ICONS, SOCIAL_MEAI_ICONS } from 'variables';

import classes from './SettingsTab.module.scss';

const blog: IBlog = {
  id: 1,
  name: "Jur'atbek",
  imgUrl: '',
  bio: 'Lorem ipsum dolor sit amet',
  links: {
    telegram: 'https://t.me/JuratbekBahodirovich',
    facebook: 'https://facebook.com',
    github: 'https://github.com/juratbek',
    linkedIn: 'https://linkedin.com',
    youtube: 'https://www.youtube.com/channel/UCCQ5c4lS04lCdf_HWecRaBA',
    instagram: 'https://www.instagram.com/mahammadaliyevj',
  },
  createdDate: new Date(),
};

export const SettingsTab: FC = () => {
  return (
    <div className='px-2'>
      <h2>Blogingiz haqida</h2>
      <Divider />
      <div className='d-flex'>
        <div className='w-50'>
          <div>
            <Avatar imgUrl={blog.imgUrl} className='my-2' size='extra-large' />
            <FileInput />
          </div>
          <div>
            <h4 className='mb-1'>Nomi</h4>
            <Input defaultValue={blog.name} onChange={console.log} />
          </div>
          <div>
            <h4 className='mb-1'>Bio</h4>
            <Textarea defaultValue={blog.bio} onChange={console.log} />
          </div>
        </div>
        <div className='w-50'>
          <h4 className='mb-1'>Ijtimoiy tarmoqlar</h4>
          <div>
            {SOCIAL_MEAI_ICONS.map((icon, index) => {
              const Icon = ICONS[icon];
              const link = blog.links[icon];

              return (
                <div key={index} className='d-flex my-2 align-items-center'>
                  <div className={classes['media-icon']}>
                    <Icon />
                  </div>
                  <div>
                    <Input className='w-100' defaultValue={link} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
