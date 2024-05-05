import { ApiError } from './ApiError';

describe('ApiError', () => {
  it('show create an error object', () => {
    const message = 'An error occurred';
    const res = new Response();
    Object.defineProperty(res, 'status', { writable: true, value: 200 });
    const error = new ApiError(message, res);
    expect(error.status).toEqual(200);
    expect(error.message).toEqual(message);
  });

  it('show be throwable', () => {
    const message = 'An error occurred';
    const res = new Response();
    Object.defineProperty(res, 'status', { writable: true, value: 200 });

    try {
      throw new ApiError(message, res);
    } catch (e) {
      const error = e as ApiError;
      expect(error.status).toEqual(200);
      expect(error.message).toEqual(message);
    }
  });
});
