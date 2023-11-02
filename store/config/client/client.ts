import { IConfig, IPostConfig } from './client.types';

class Client {
  #config: Partial<IConfig> = { contentType: 'application/json' };

  constructor(config: IConfig) {
    this.#config = { ...this.#config, ...config };
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const res = await fetch(path, { method: 'get', ...this.#config });
      const data = await res.json();
      return data as TResponse;
    } catch (e) {
      throw new Error('An error occured');
    }
  }

  async post<TBody extends BodyInit, TResponse>(config: IPostConfig<TBody>): Promise<TResponse> {
    try {
      const res = await fetch(config.path, { method: 'post', body: config.body, ...this.#config });
      const data = await res.json();
      return data as TResponse;
    } catch (e) {
      throw new Error('An error occured');
    }
  }
}

export default Client;
