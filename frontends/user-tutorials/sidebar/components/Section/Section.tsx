import { useUrlParams } from 'hooks';
import { FC } from 'react';
import { ITutorialSectionItem } from 'types';

import { SectionItem } from '../SectionItem/SectionItem';
import classes from './Section.module.scss';
import { ISectionProps } from './Section.types';
import { SectionHeader } from './SectionHeader';

export const Section: FC<ISectionProps> = ({ section }) => {
  const { setParams } = useUrlParams();

  const selectItem = (item: ITutorialSectionItem): void => {
    setParams({ itemId: item.id, articleId: item.articleId?.toString() });
  };

  return (
    <div>
      <SectionHeader section={section} />
      <ul className={classes.articles}>
        {section.items.map((item) => (
          <li key={item.id}>
            <SectionItem item={item} section={section} onClick={(): void => selectItem(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
