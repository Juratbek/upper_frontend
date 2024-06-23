export interface IImageData {
  caption?: string;
  file?: {
    url: string;
    width?: number;
    height?: number;
  };
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  alignment?: 'center';
}
