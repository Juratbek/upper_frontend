import { Input } from 'components/form';
import { Spinner } from 'components/lib';
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchLabels } from 'store/clients/label';
import { debouncer } from 'utils/debouncer';

import { DEFAULT_LABELS } from './LabelsSelector.constants';
import classes from './LabelsSelector.module.scss';
import { ILabelSelectorOptions } from './LabelsSelector.types';

const inputDebouncer = debouncer<string>();

export const LabelsSelector: FC<ILabelSelectorOptions> = ({ defaultValues = [], ...props }) => {
  const [search, setSeach] = useState('');
  const searchLabelsRes = useSearchLabels(search);
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues ?? []);
  const [inputValue, setInputValue] = useState<string>();
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

  const keydownHandler = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      const value = target.value.trim();
      if (value.length < 1) return;
      selectOption(value);
      setInputValue('');
    }
  }, []);

  const removeSelectedLabel = (value: string): void => {
    setSelectedValues((prev) => {
      const filtered = prev.filter((v) => v !== value);
      props.onChange?.(filtered);
      return filtered;
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    const trimmedValue = value.trim();
    if (trimmedValue) {
      inputDebouncer(value, setSeach);
    }
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

  const optionsContent = useMemo(() => {
    const { data: labels, isLoading, isError, isStale } = searchLabelsRes;

    if (isLoading) {
      return <Spinner color='light' className='mx-auto' />;
    }
    if (isError) {
      return <p>Xatolik yuz berdi</p>;
    }
    if (labels?.length === 0) {
      return <p>Teglar topilmadi</p>;
    }
    if (isStale) {
      return (
        <ul className={classes['options-list']}>
          {DEFAULT_LABELS.map((label) => (
            <li key={label} className={classes['options-item']}>
              <button onClick={(): void => selectOption(label)}>{label}</button>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className={classes['options-list']}>
        {labels?.map((label) => (
          <li key={label.id} className={classes['options-item']}>
            <button onClick={(): void => selectOption(label.name)}>{label.name}</button>
          </li>
        ))}
      </ul>
    );
  }, [searchLabelsRes, selectOption]);

  return (
    <div className={classes.root} ref={ref}>
      <ul className={`${classes['selected-labels']} ${selectedValues.length ? 'my-1' : 'm-0'}`}>
        {selectedValues.map((value) => (
          <li key={value} className={classes['selected-label']}>
            <span className={classes.text}>{value}</span>
            <span className={classes.icon} onClick={(): void => removeSelectedLabel(value)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <div className={classes['form-container']}>
        <Input
          rootClassName={classes.input}
          ref={inputRef}
          type='text'
          onFocus={onInputFocus}
          value={inputValue}
          className={classes.input}
          onChange={onInputChange}
          placeholder={props.inputPlacegolder}
          onKeyDown={keydownHandler}
        />
        <button className={classes['add-btn']} onClick={(): void => selectOption(inputValue ?? '')}>
          ✓
        </button>
      </div>
      <div
        className={`${classes['options-container']} ${
          isOptionsContainerOpen ? 'd-block' : 'd-none'
        }`}
      >
        {optionsContent}
      </div>
    </div>
  );
};
