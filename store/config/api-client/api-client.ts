import { isClientSide } from 'utils';
import { ApiError } from 'utils/error';
import { TOKEN } from 'variables';

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

  async get<TResponse>(path: string, params?: Record<string, string>): Promise<TResponse> {
    let fullPath = path;
    if (params) {
      const searchParams = new URLSearchParams(params);
      fullPath = `${fullPath}?${searchParams.toString()}`;
    }
    const res = await this.fetch(fullPath, { method: 'get' });
    const isJson = checkContentType(res, 'application/json');
    if (isJson) {
      const data = await res.json();
      return data as TResponse;
    }
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
    if (isClientSide()) {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        config.headers = { ...this.#config.headers, Authorization: token, ...config.headers };
      }
    }
    const res = await fetch(fullUrl, config);
    if (res.status === 200) {
      return res;
    } else {
      const message = checkContentType(res, 'application/json') ? (await res.json()).message : '';
      throw new ApiError(message, res);
    }
  }
}

export default Client;
