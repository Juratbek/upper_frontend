import Link from 'next/link';
import { FC } from 'react';

import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <div className={styles.footerContainer}>
      <ul className={styles.footerNav}>
        <li>
          <Link href={'/contact'}>
            <a>Aloqa</a>
          </Link>
        </li>
        <li>
          <Link href={'/about-us'}>
            <a>Biz haqimizda</a>
          </Link>
        </li>
        <li>
          <Link href={'/docs'}>
            <a>Qo`llanma</a>
          </Link>
        </li>
        <li>
          <Link href={'/team'}>
            <a>Jamoa</a>
          </Link>
        </li>
      </ul>
      <p className={styles.copyrightText}>
        © {new Date().getFullYear()} UPPER | Barcha huquqlar himoyalangan
      </p>
    </div>
  );
};
