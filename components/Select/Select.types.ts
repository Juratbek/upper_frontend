export interface ISelectOption {
  value: number | string;
  label: string;
}
export interface ISelectProps {
  className?: string;
  options?: ISelectOption[];
}
