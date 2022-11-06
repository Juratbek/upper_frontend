import { useDebounce } from 'hooks';
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { getClassName } from 'utils';

import classes from './MultiSelect.module.scss';
import { IOption, TMultiSelectProps } from './MultiSelect.types';

function filterOptions(options: IOption[], option: IOption): IOption[] {
  return options.filter((item) => item.value !== option.value);
}

export const MultiSelect: FC<TMultiSelectProps> = ({
  className,
  defaultValues = [],
  disabled = false,
  options = [],
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(defaultValues);
  const [isOptionsContainerOpen, setIsOptionsContainerOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const selectClassName = getClassName(classes.select, className);
  const ref = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    props.onInputDebounce?.(debouncedValue);
  }, [debouncedValue]);

  const selectOption = (option: IOption): void => {
    if (inputValue) {
      setInputValue('');
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  const unselectOption = (option: IOption): void => {
    if (disabled) return;
    const filteredOptions = filterOptions(selectedOptions, option);
    setSelectedOptions(filteredOptions);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const onInputFocus = (): void => {
    setIsOptionsContainerOpen(true);
  };

  const clickListener = (event: MouseEvent): void => {
    const clickedElement = event.target as Node;
    const select = ref.current;
    const didOptionsContainerClicked = !document.contains(clickedElement);
    const didSelectClicked = select?.contains(clickedElement);
    if (didOptionsContainerClicked || didSelectClicked) return;
    setIsOptionsContainerOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickListener);
    return () => window.removeEventListener('click', clickListener);
  }, []);

  useEffect(() => {
    props.onChange?.(selectedOptions);
  }, [selectedOptions]);

  const optionsContent = useMemo(() => {
    const renderItem = (option: IOption): JSX.Element =>
      props.renderItem ? (
        props.renderItem(option)
      ) : (
        <div className={classes['option__item']}>{option.label}</div>
      );

    const selectedOptionsValues = selectedOptions.map((option) => option.value);
    const selectedOptionsValuesSet = new Set(selectedOptionsValues);
    const availableOptions = options.filter(
      (option) => !selectedOptionsValuesSet.has(option.value),
    );
    if (availableOptions.length === 0) {
      return <div className={classes['option__item']}>No options</div>;
    }
    return (
      <>
        {availableOptions.map((option) => (
          <div key={option.value} onClick={(): void => selectOption(option)}>
            {renderItem(option)}
          </div>
        ))}
      </>
    );
  }, [options, selectedOptions]);

  return (
    <div className={classes.container} ref={ref}>
      <div className={selectClassName}>
        {selectedOptions.map((option) => (
          <span
            onClick={(): void => unselectOption(option)}
            className={`${classes['option__selected']} me-1`}
            key={option.value}
          >
            {option.label}
          </span>
        ))}
        {!disabled && (
          <input
            type='text'
            value={inputValue}
            onFocus={onInputFocus}
            className={classes.input}
            onChange={onInputChange}
            placeholder={props.inputPlacegolder}
          />
        )}
      </div>
      <div
        className={`${classes['option-container']} ${
          isOptionsContainerOpen && !disabled ? 'd-block' : 'd-none'
        }`}
      >
        {optionsContent}
      </div>
    </div>
  );
};
