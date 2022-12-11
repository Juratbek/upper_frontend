import { Avatar } from 'components';

import { team } from './TeamPage.constants';
import classes from './TeamPage.module.scss';

export const TeamPage = (): JSX.Element => {
  return (
    <div className='container pt-3'>
      <h1 className='text-center'>Bizning Jamoa</h1>
      <div className='d-flex flex-mobile-col justify-content-around'>
        {team.map((member, index) => (
          <div
            key={index}
            className={`card mb-4 w-40 mt-5 mb-3 w-mobile-100 text-center position-relative ${classes.member}`}
          >
            <Avatar size='xxl' className={classes.avatar} imgUrl={member.imgUrl} />
            <h2>{member.name}</h2>
            <p>{member.position}</p>
            <div>
              {member.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.icon}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};