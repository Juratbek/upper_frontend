export interface ISelectOption {
  value: number | string;
  label: string;
}
export interface ISelectProps {
  className?: string;
  options?: ISelectOption[];
  defaultValue?: ISelectOption;
  onChange?: (option: ISelectOption) => void;
  onInputDebounce?: (value: string) => void;
  placeholder?: string;
  searcheable?: boolean;
}
