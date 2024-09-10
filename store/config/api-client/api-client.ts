import { TOKEN } from 'constants/auth';
import { isClientSide } from 'utils';
import { ApiError } from 'utils/error';

import { IConfig, IPostConfig } from './api-client.types';
import { checkContentType } from './api-client.utils';

class Client {
  #config: IConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseUrl: '',
  };

  constructor(config: IConfig) {
    this.#config = { ...this.#config, ...config };
  }

  async get<TResponse>(
    path: string,
    params?: Record<string, string>,
    config?: RequestInit,
  ): Promise<TResponse> {
    let fullPath = path;
    if (params) {
      const searchParams = new URLSearchParams(params);
      fullPath = `${fullPath}?${searchParams.toString()}`;
    }

    const res = await this.fetch(fullPath, { ...config, method: 'get' });

    const isJson = checkContentType(res, 'application/json');
    if (isJson) {
      const data = await res.json();
      return data as TResponse;
    }

    const isText = checkContentType(res, 'text/plain');
    if (isText) {
      const data = await res.text;
      return data as TResponse;
    }

    const isResponseEmpty = !res.headers.get('Content-Type');
    if (isResponseEmpty) return undefined as TResponse;
    return res as TResponse;
  }

  async post<TBody = unknown, TResponse = unknown>({
    path,
    ...config
  }: IPostConfig<TBody>): Promise<TResponse> {
    const res = await this.fetch(path, {
      method: 'post',
      body: JSON.stringify(config.body),
      headers: config.headers,
    });
    const isJson = checkContentType(res, 'application/json');
    if (isJson) {
      const data = await res.json();
      return data as TResponse;
    }
    return res as TResponse;
  }

  async delete(path: string): Promise<void> {
    await this.fetch(path, {
      method: 'delete',
    });
  }

  async fetch(path: string, config: RequestInit): Promise<Response> {
    const fullUrl = `${this.#config.baseUrl}/api/${path}`;
    const finalHeaders: RequestInit['headers'] & { Authorization?: string } = {
      ...this.#config.headers,
      ...config.headers,
    };

    if (isClientSide()) {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        finalHeaders.Authorization = `Bearer ${token}`;
      }
    }

    const finalConfig: RequestInit = { ...this.#config, ...config, headers: finalHeaders };
    const res = await fetch(fullUrl, finalConfig);

    if (res.ok) {
      return res;
    } else {
      let message = '';
      let data;

      const isJson = checkContentType(res, 'application/json');
      if (isJson) {
        const json = await res.json();
        message = json.message ?? json.error ?? '';
        data = json;
      }

      throw new ApiError(message, res, data);
    }
  }
}

export default Client;
