export class ApiError extends Error {
  #status = 0;
  #data: unknown = null;

  constructor(message: string, response: Response, data: unknown) {
    super(message);
    this.#status = response.status;
    this.#data = data;
  }

  get status(): number {
    return this.#status;
  }

  get data() {
    return this.#data;
  }
}
