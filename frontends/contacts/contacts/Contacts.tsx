import Link from 'next/link';

import { CONTACTS } from './Contacts.constants';
import classes from './Contacts.module.scss';

export const Contacts = (): JSX.Element => {
  return (
    <div className={classes.contacts}>
      {CONTACTS.map((contact) => (
        <Link href={contact.link} key={contact.link}>
          <a target='_blank' className={`${classes.contact} card w-30`}>
            <span className={classes.icon}>
              <contact.icon />
            </span>
            <p>{contact.text}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};
