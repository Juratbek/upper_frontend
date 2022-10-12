import { useClickOutside } from 'hooks';
import { FC, useMemo, useState } from 'react';

import classes from './Select.module.scss';
import { ISelectOption, ISelectProps } from './Select.types';

export const Select: FC<ISelectProps> = ({ options = [] }) => {
  const [selectedOption, setSelectedOption] = useState<ISelectOption>();
  const [isOptionsContainerOpen, setIsOptionsContainerOpen] = useState<boolean>(false);

  const closeOptionsContainer = (): void => {
    setIsOptionsContainerOpen(false);
  };

  const [ref] = useClickOutside(closeOptionsContainer);

  const selectOption = (option: ISelectOption): void => {
    setSelectedOption(option);
    closeOptionsContainer();
  };

  const openOptionsContainer = (): void => {
    setIsOptionsContainerOpen(true);
  };

  const optionsContent = useMemo(() => {
    if (options.length === 0) return <div className={classes['option__item']}>No options</div>;
    const unselectedOptions = options.filter((option) => option.value !== selectedOption?.value);

    return unselectedOptions.map((option) => (
      <div
        key={option.value}
        onClick={(): void => selectOption(option)}
        className={classes['option__item']}
      >
        {option.label}
      </div>
    ));
  }, [options, selectedOption]);

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.select} onClick={openOptionsContainer}>
        {selectedOption?.label}
      </div>
      <div
        className={`${classes['option-container']} ${
          isOptionsContainerOpen ? 'd-block' : 'd-none'
        }`}
      >
        {optionsContent}
      </div>
    </div>
  );
};
