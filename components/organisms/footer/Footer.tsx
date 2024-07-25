import { Logo } from 'components/molecules';
import { WEB_APP_ROOT_DIR } from 'constants/common';
import Link from 'next/link';
import { FC } from 'react';

import { LINKS, MEDIA_ICONS } from './Footer.constants';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <div className={`${styles.container} container`}>
        <div className={styles['main-block']}>
          <Logo />
          <ul className={styles.links}>
            {LINKS.map(({ url, text, target }) => (
              <li key={text} className={styles.text}>
                {url.startsWith('http') ? (
                  <a href={url} target={target}>
                    {text}
                  </a>
                ) : (
                  <Link href={WEB_APP_ROOT_DIR + url}>{text}</Link>
                )}
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
