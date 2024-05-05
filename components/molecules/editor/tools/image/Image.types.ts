export interface IImageData {
  caption?: string;
  file: {
    url: string;
  };
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  alignment?: 'center';
}
