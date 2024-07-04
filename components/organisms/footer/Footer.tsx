import { Logo } from 'components/molecules';
import Link from 'next/link';
import { FC } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import { LINKS, MEDIA_ICONS } from './Footer.constants';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <div className={`${styles.container} container`}>
        <div className={styles['main-block']}>
          <Logo />
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.text} className={styles.text}>
                <Link href={WEB_APP_ROOT_DIR + link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['secondary-block']}>
          <p className={styles.text}>
            © {new Date().getFullYear()} UPPER | Barcha huquqlar himoyalangan
          </p>
          <ul className={styles['media-icons']}>
            {MEDIA_ICONS.map(({ icon: Icon, url }) => (
              <li key={Icon.toString()} className={styles['media-icon-btn']}>
                <Link href={url} target='_blank'>
                  <Icon width={20} height={20} color='white' />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
