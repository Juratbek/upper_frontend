export interface IChangeableTextProps {
  value: string;
  onChange?: (value: string) => void;
  onDebaunce?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClick?: () => void;
  defaultFocused?: boolean;
  className?: string;
  loading?: boolean;
  placeholder?: string;
}
