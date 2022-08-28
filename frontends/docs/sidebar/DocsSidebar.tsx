import { Dropdown } from 'components';
import Link from 'next/link';
import { FC } from 'react';

import { DOCS_SIDEBAR_LINKS } from './DocsSidebar.constants';
import classes from './DocsSidebar.module.scss';
import { IDocsSidebarLink } from './DocsSidebar.types';

export const DocsSidebar: FC = () => {
  const getLinks = (links: IDocsSidebarLink[], url = ''): JSX.Element[] => {
    return links.map((link, index) =>
      link.children ? (
        <Dropdown
          key={index}
          title={link.name}
          titleClassName={classes.link}
          dropdownClassName={classes.dropdown}
        >
          {getLinks(link.children, url + link.url)}
        </Dropdown>
      ) : (
        <Link href={`/docs/${url}/${link.url}`}>
          <div className={classes.link}>{link.name}</div>
        </Link>
      ),
    );
  };

  return <div className={classes.container}>{getLinks(DOCS_SIDEBAR_LINKS)}</div>;
};
