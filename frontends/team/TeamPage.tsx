import { Avatar } from 'components';
import { ICONS } from 'variables';

import { team } from './TeamPage.constants';
import classes from './TeamPage.module.scss';

const LinkedIn = ICONS.linkedIn;

export const TeamPage = (): JSX.Element => {
  return (
    <div className='container pt-3'>
      <h1 className='text-center'>Bizning Jamoa</h1>
      <div className='d-flex justify-content-around'>
        {team.map((member, index) => (
          <div key={index} className='card mb-4 w-40 mt-5 text-center position-relative'>
            <Avatar size='xxl' className={classes.avatar} imgUrl={member.imgUrl} />
            <h2>{member.name}</h2>
            <p>{member.position}</p>
            <div>
              <a href={member.linkedIn} target='_blank' rel='noreferrer' className={classes.icon}>
                <LinkedIn />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
