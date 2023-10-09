import { Divider } from 'components/lib';
import { ICONS } from 'variables';

import { NavItem } from './components/item';
import { NAVIGATION } from './Navigation.constants';

export const Navigation = (): JSX.Element => {
  return (
    <>
      {NAVIGATION.map((item, index) => {
        const Icon = item.icon ? ICONS[item.icon] : null;
        return (
          <>
            <NavItem active={item.active} key={item.text} href={item.href}>
              {Icon && <Icon />} {item.text}
            </NavItem>
            {index + 1 !== NAVIGATION.length && <Divider color='tertiary' my={4} />}
          </>
        );
      })}
    </>
  );
};
