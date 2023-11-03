import { TOKEN } from 'variables';

import { IConfig, IPostConfig } from './api-client.types';

class Client {
  #config: IConfig = { contentType: 'application/json', baseUrl: '' };

  constructor(config: IConfig) {
    this.#config = { ...this.#config, ...config };
  }

  async get<TResponse>(path: string, params?: Record<string, string>): Promise<TResponse> {
    try {
      let fullPath = path;
      if (params) {
        const searchParams = new URLSearchParams(params);
        fullPath = `${fullPath}?${searchParams.toString()}`;
      }
      const res = await this.fetch(fullPath, { method: 'get', ...this.#config });
      const data = await res.json();
      return data as TResponse;
    } catch (e) {
      throw new Error('An error occured');
    }
  }

  async post<TBody extends BodyInit, TResponse>(config: IPostConfig<TBody>): Promise<TResponse> {
    try {
      const res = await this.fetch(config.path, { method: 'post', body: config.body });
      const data = await res.json();
      return data as TResponse;
    } catch (e) {
      throw new Error('An error occured');
    }
  }

  async fetch(path: string, config: RequestInit): Promise<Response> {
    const fullUrl = `${this.#config.baseUrl}/api/${path}`;
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers = { ...config?.headers, Authorization: token };
    }
    return fetch(fullUrl, config);
  }
}

export default Client;
