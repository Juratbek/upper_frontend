export interface IImageData {
  caption?: string;
  file?: {
    url: string;
    width?: number;
    height?: number;
    name: string;
  };
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  alignment?: 'center';
}
