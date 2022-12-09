import Link from 'next/link';

import { CONTACTS } from './Contacts.constants';
import classes from './Contacts.module.scss';

export const Contacts = (): JSX.Element => {
  return (
    <div className={`${classes.contacts} flex-mobile-col`}>
      {CONTACTS.map((contact) => (
        <Link href={contact.link} key={contact.link}>
          <a target='_blank' className={`${classes.contact} mb-4 card w-30 w-mobile-100`}>
            <span className={classes.icon}>
              <contact.icon />
            </span>
            <h3>{contact.text}</h3>
          </a>
        </Link>
      ))}
    </div>
  );
};
