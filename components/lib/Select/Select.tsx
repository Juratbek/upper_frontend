import { useClickOutside, useTheme } from 'hooks';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { debouncer, getClassName } from 'utils';

import classes from './Select.module.scss';
import { ISelectOption, ISelectProps } from './Select.types';

const debounce = debouncer<string>(500);

export const Select: FC<ISelectProps> = ({ options = [], searcheable = false, ...props }) => {
  const { onInputDebounce } = props;
  const containerClassName = getClassName(classes.container, props.className);
  const { themeColors } = useTheme();
  const [selectedOption, setSelectedOption] = useState<ISelectOption | undefined>(
    props.defaultValue,
  );
  const [isOptionsContainerOpen, setIsOptionsContainerOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const closeOptionsContainer = (): void => {
    setIsOptionsContainerOpen(false);
  };

  const [ref] = useClickOutside(closeOptionsContainer);

  const selectOption = (option: ISelectOption): void => {
    setSelectedOption(option);
    closeOptionsContainer();
    searcheable && setInputValue(option.label);
    props.onChange?.(option);
  };

  const openOptionsContainer = (): unknown => setIsOptionsContainerOpen(true);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target?.value;
    setInputValue(value);
    onInputDebounce && debounce(value, onInputDebounce);
  };

  const optionsContent = useMemo(() => {
    if (options.length === 0) {
      return <div className={classes['option__item']}>Varyantlar masjud emas</div>;
    }
    const unselectedOptions = options.filter((option) => {
      const isSelected = option.value === selectedOption?.value;
      if (searcheable && inputValue) {
        const label = option.label.toString().toLowerCase();
        const doesMatchForSearch = label.includes(inputValue.toLowerCase());
        return !isSelected && doesMatchForSearch;
      }
      return !isSelected;
    });

    return unselectedOptions.map((option) => (
      <div
        key={option.value}
        onClick={(): void => selectOption(option)}
        className={classes['option__item']}
      >
        {option.label}
      </div>
    ));
  }, [options, selectedOption, inputValue]);

  const renderSelect = useMemo(() => {
    if (searcheable) {
      return (
        <input
          type='text'
          onFocus={openOptionsContainer}
          className={classes.select}
          placeholder={props.placeholder}
          value={inputValue}
          onChange={inputChangeHandler}
          style={{ borderColor: themeColors.input.border }}
        />
      );
    }
    return (
      <div className={classes.select} onClick={openOptionsContainer}>
        {selectedOption?.label || <span className={classes.placeholder}>{props.placeholder}</span>}
      </div>
    );
  }, [selectedOption, inputValue, themeColors]);

  return (
    <div className={containerClassName} ref={ref}>
      {renderSelect}
      <div
        className={`${classes['option-container']} ${
          isOptionsContainerOpen ? 'd-block' : 'd-none'
        }`}
        style={{ backgroundColor: themeColors.bg, borderColor: themeColors.input.border }}
      >
        {optionsContent}
      </div>
    </div>
  );
};
