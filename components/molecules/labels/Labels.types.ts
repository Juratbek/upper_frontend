import { CSSProperties } from 'react';

export interface ILabelsProps {
  labels: string[];
  activeLabel: string;
  onSelect: (label: string) => unknown;
  style?: CSSProperties;
}
