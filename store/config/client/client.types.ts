type TContentType = 'application/json';

export interface IConfig {
  baseUrl: string;
  contentType?: TContentType;
}

export interface IPostConfig<TBody> {
  body?: TBody;
  path: string;
}
