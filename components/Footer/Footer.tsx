import Link from 'next/link';
import { FC } from 'react';

import { LINKS } from './Footer.constants';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <div className={styles.footerContainer}>
      <ul className={styles.footerNav}>
        {LINKS.map((link) => (
          <li key={link.text}>
            <Link href={link.url}>
              <a>{link.text}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p className={styles.copyrightText}>
        © {new Date().getFullYear()} UPPER | Barcha huquqlar himoyalangan
      </p>
    </div>
  );
};
