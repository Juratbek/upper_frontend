export interface IChangeableTextProps {
  value: string;
  onChange?: (value: string) => void;
  onDebaunce?: (value: string) => void;
  onSubmit?: (value: string) => void;
  defaultFocused?: boolean;
  className?: string;
}
