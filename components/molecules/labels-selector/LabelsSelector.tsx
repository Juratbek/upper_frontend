import { Input } from 'components/form';
import { TabButton } from 'components/lib';
import { PopularLabels } from 'constants/labels';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import classes from './LabelsSelector.module.scss';
import { ILabelSelectorOptions } from './LabelsSelector.types';

export const LabelsSelector: FC<ILabelSelectorOptions> = ({ defaultValues = [], ...props }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues ?? []);
  const [isOptionsContainerOpen, setIsOptionsContainerOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectOption = (label: string): void => {
    if (!label || label.length < 1) return;

    setSelectedValues((prev) => {
      const set = new Set(prev);
      set.add(label);
      const newList = Array.from(set);
      props.onChange?.(newList);
      return newList;
    });

    setIsOptionsContainerOpen(false);
  };

  const addOption = () => {
    const current = inputRef.current;
    if (!current) return;

    selectOption(current.value);
    current.value = '';
  };

  const keydownHandler = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      const value = target.value.trim();
      if (value.length < 1) return;
      selectOption(value);
      target.value = '';
    }
  }, []);

  const removeSelectedLabel = (value: string): void => {
    setSelectedValues((prev) => {
      const filtered = prev.filter((v) => v !== value);
      props.onChange?.(filtered);
      return filtered;
    });
  };

  const onInputFocus = (): unknown => setIsOptionsContainerOpen(true);

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

  const renderOptions = () => (
    <div className={classes['options-list']}>
      {PopularLabels.map((label) => (
        <TabButton
          key={label}
          className={classes['options-item']}
          onClick={(): void => selectOption(label)}
          color='outlined'
        >
          {label}
        </TabButton>
      ))}
    </div>
  );

  return (
    <div className={classes.root} ref={ref}>
      <div className={`${classes['selected-labels']} ${selectedValues.length ? 'my-1' : 'm-0'}`}>
        {selectedValues.map((value) => (
          <TabButton
            key={value}
            color='outlined'
            className={classes['selected-label']}
            onClick={(): void => removeSelectedLabel(value)}
          >
            {value}
          </TabButton>
        ))}
      </div>
      <div className={classes['form-container']}>
        <Input
          rootClassName={classes.input}
          ref={inputRef}
          type='text'
          onFocus={onInputFocus}
          className={classes.input}
          placeholder={props.inputPlaceholder}
          onKeyDown={keydownHandler}
        />
        <button className={classes['add-btn']} onClick={addOption}>
          Qo&apos;shish
        </button>
      </div>
      <div
        className={`${classes['options-container']} ${
          isOptionsContainerOpen ? 'd-block' : 'd-none'
        }`}
      >
        {renderOptions()}
      </div>
    </div>
  );
};
