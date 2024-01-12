export interface ILabelsProps {
  labels: string[];
  activeLabel: string;
  onSelect: (label: string) => unknown;
}
