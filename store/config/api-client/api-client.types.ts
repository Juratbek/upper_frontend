type TDataFormat = 'application/json;charset=UTF-8';

export interface IHeaders {
  Accept: TDataFormat;
  contentType?: TDataFormat;
  Authorization?: string;
}

export interface IConfig {
  baseUrl: string;
  headers?: HeadersInit;
}

export interface IPostConfig<TBody> {
  body?: TBody;
  path: string;
  headers?: Record<string, string>;
}
