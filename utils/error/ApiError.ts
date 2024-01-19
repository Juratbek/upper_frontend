export class ApiError extends Error {
  #status = 0;

  constructor(message: string, response: Response) {
    super(message);
    this.#status = response.status;
  }

  get status(): number {
    return this.#status;
  }
}
