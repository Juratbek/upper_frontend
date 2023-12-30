import { isClientSide } from 'utils';
import { TOKEN } from 'variables';

import { IConfig, IPostConfig } from './api-client.types';

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
    const data = await res.json();
    return data as TResponse;
  }

  async post<TBody = unknown, TResponse = unknown>({
    path,
    ...config
  }: IPostConfig<TBody>): Promise<TResponse> {
    const res = await this.fetch(path, {
      method: 'post',
      body: JSON.stringify(config.body),
    });
    const data = await res.json();
    return data as TResponse;
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
        config.headers = { ...this.#config.headers, ...config.headers, Authorization: token };
      }
    }
    const res = await fetch(fullUrl, config);
    if (res.status === 200) {
      return res;
    } else {
      throw new Error(`An Error occured while fetching ${path}: ${res}`);
    }
  }
}

export default Client;
