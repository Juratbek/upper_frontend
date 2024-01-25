import { Avatar } from 'components/lib';
import { useTheme } from 'hooks';
import Link from 'next/link';

import { team } from './TeamPage.constants';
import classes from './TeamPage.module.scss';

export const TeamPage = (): JSX.Element => {
  const {
    themeColors: { icon: iconColor },
  } = useTheme();

  return (
    <div className='container flex-1'>
      <h1 className='text-center'>Bizning Jamoa</h1>
      <div className={classes['cards-container']}>
        {team.map((member, index) => (
          <div key={index} className={`card text-center position-relative ${classes.member}`}>
            <div className={classes['avatar-container']}>
              <Avatar
                size='extra-large'
                className={classes.avatar}
                imgUrl={member.imgUrl}
                zoomable
              />
            </div>
            <h2>{member.name}</h2>
            <p>{member.position}</p>
            <div>
              {member.links.map((link) => (
                <Link
                  href={link.url}
                  key={link.url}
                  className={classes.icon}
                  target={link.target ?? '_blank'}
                >
                  <link.icon color={iconColor} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
