import { Dropdown } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeSidebar } from 'store/states';
import { WEB_APP_ROOT_DIR } from 'variables';

import { DOCS_SIDEBAR_LINKS } from './DocsSidebar.constants';
import classes from './DocsSidebar.module.scss';
import { IDocsSidebarLink, TGetLinksProps } from './DocsSidebar.types';

export const DocsSidebar: FC = () => {
  const dispatch = useAppDispatch();

  const closeSidebarHandler = (): void => {
    dispatch(closeSidebar());
  };

  const getLinks: TGetLinksProps = (links, padding) => {
    const generateLink = (
      links: IDocsSidebarLink[],
      url = '',
      paddingLeft = padding,
    ): JSX.Element[] => {
      return links.map((link, index) => {
        const pdLeftInRem = paddingLeft + padding + 'rem';

        if (link.children) {
          const finalUrl = `${url}${link.url}_`;
          return (
            <Dropdown
              key={index}
              title={link.name}
              titleClassName={classes.link}
              paddingLeft={pdLeftInRem}
            >
              {generateLink(link.children, finalUrl, paddingLeft + padding)}
            </Dropdown>
          );
        }
        return (
          <Link href={`${WEB_APP_ROOT_DIR}/docs/${url + link.url}`} key={index}>
            <a
              className={classes.link}
              style={{ paddingLeft: pdLeftInRem }}
              onClick={closeSidebarHandler}
            >
              {link.name}
            </a>
          </Link>
        );
      });
    };

    return generateLink(links, '', padding);
  };

  return <div className={classes.container}>{getLinks(DOCS_SIDEBAR_LINKS, 1)}</div>;
};
