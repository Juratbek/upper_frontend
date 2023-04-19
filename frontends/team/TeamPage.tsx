import { Avatar } from 'components';
import { useTheme } from 'hooks';
import Link from 'next/link';

import { team } from './TeamPage.constants';
import classes from './TeamPage.module.scss';

export const TeamPage = (): JSX.Element => {
  const {
    themeColors: { icon: iconColor },
  } = useTheme();

  return (
    <div className='container pt-3'>
      <h1 className='text-center'>Bizning Jamoa</h1>
      <div className='d-flex flex-mobile-col justify-content-around flex-wrap'>
        {team.map((member, index) => (
          <div
            key={index}
            className={`card mb-4 mt-5 mb-3 w-mobile-100 text-center position-relative ${classes.member}`}
          >
            <div className={classes['avatar-container']}>
              <Avatar size='xxl' className={classes.avatar} imgUrl={member.imgUrl} zoomable />
            </div>
            <h2>{member.name}</h2>
            <p>{member.position}</p>
            <div>
              {member.links.map((link) => (
                <Link href={link.url} key={link.url}>
                  <a className={classes.icon} target={link.target || '_blank'}>
                    <link.icon color={iconColor} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
