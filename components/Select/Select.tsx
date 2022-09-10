import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { getClassName } from 'utils';

import classes from './Select.module.scss';
import { IOption, TSelectProps } from './Select.types';

function filterOptions(options: IOption[], option: IOption): IOption[] {
  return options.filter((item) => item.value !== option.value);
}

function getAvailableOptions(options: IOption[] | undefined, defaultValues: IOption[]): IOption[] {
  if (defaultValues && options) return options.filter((option) => !defaultValues.includes(option));
  return options || [];
}

export const Select: FC<TSelectProps> = ({
  className,
  defaultValues = [],
  disabled = false,
  ...props
}) => {
  const defaultNotSelectedOptions = useMemo(
    () => getAvailableOptions(props.options, defaultValues),
    [props.options, defaultValues],
  );
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(defaultValues);
  const [options, setOptions] = useState<IOption[]>(defaultNotSelectedOptions);
  const [unselectedOptions, setUnselectedOptions] = useState<IOption[]>(defaultNotSelectedOptions);
  const [isOptionsConteinerOpen, setIsOptionsConteinerOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const selectClassName = getClassName(classes.select, className);
  const ref = useRef<HTMLDivElement>(null);

  const selectOption = (option: IOption): void => {
    if (inputValue) {
      setInputValue('');
      setOptions(props.options || []);
    }
    const filteredUnselectedOptions = filterOptions(unselectedOptions, option);
    setUnselectedOptions(filteredUnselectedOptions);
    setOptions(filteredUnselectedOptions);
    setSelectedOptions([...selectedOptions, option]);
  };

  const unselectOption = (option: IOption): void => {
    if (disabled) return;
    const filteredOptions = filterOptions(selectedOptions, option);
    const newUnselectedOptions = [...unselectedOptions, option];
    setUnselectedOptions(newUnselectedOptions);
    setOptions(newUnselectedOptions);
    setSelectedOptions(filteredOptions);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    const filteredOptions = unselectedOptions.filter((option) =>
      option.label.toLowerCase().includes(value),
    );
    setOptions(filteredOptions);
  };

  const onInputFocus = (): void => {
    setIsOptionsConteinerOpen(true);
  };

  const getOptions = (): JSX.Element => {
    if (options.length === 0) {
      return <div className={classes['option__item']}>No options</div>;
    }
    return (
      <>
        {options.map((option) => (
          <div
            key={option.value}
            className={classes['option__item']}
            onClick={(): void => selectOption(option)}
          >
            {option.label}
          </div>
        ))}
      </>
    );
  };

  const clickListener = (event: MouseEvent): void => {
    const clickedElement = event.target as Node;
    const select = ref.current;
    const didOptionsContainerClicked = !document.contains(clickedElement);
    const didSelectClicked = select?.contains(clickedElement);
    if (didOptionsContainerClicked || didSelectClicked) return;
    setIsOptionsConteinerOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', (e) => clickListener(e));
  }, []);

  useEffect(() => {
    props.onChange?.(selectedOptions);
  }, [selectedOptions]);

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
          />
        )}
      </div>
      <div
        className={`${classes['option-container']} ${
          isOptionsConteinerOpen && !disabled ? 'd-block' : 'd-none'
        }`}
      >
        {getOptions()}
      </div>
    </div>
  );
};
