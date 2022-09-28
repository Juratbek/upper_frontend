import { Divider } from 'components';
import { FC } from 'react';
import { IBlog } from 'types';
import { toDateString } from 'utils';
import { ICONS } from 'variables';

import classes from '../Blog.module.scss';

const blog: IBlog = {
  id: 1,
  name: "Jur'atbek",
  imgUrl: '',
  bio: 'Lorem ipsum dolor sit amet',
  links: [{ type: 'telegram', link: 'https://t.me/JuratbekBahodirovich' }],
  createdDate: new Date(),
};

export const AboutTab: FC = () => {
  const { bio, links, createdDate } = blog;

  return (
    <div className='tab px-2'>
      <div className='bio'>
        {bio && (
          <>
            <h4>Bio</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error distinctio excepturi
              enim, ab eaque odio.
            </p>
          </>
        )}
      </div>
      <Divider />
      {links && (
        <div className={classes['social-media']}>
          {links.map((link) => {
            const Icon = ICONS[link.type];
            return (
              <div className={classes['social-media-link']} key={link.type}>
                <a href={link.link} target='_blank' rel='noreferrer'>
                  <Icon />
                </a>
              </div>
            );
          })}
        </div>
      )}
      <p>{toDateString(createdDate, { month: 'long' })}dan beri UPPER azosi</p>
    </div>
  );
};
