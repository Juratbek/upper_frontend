export interface IResponseError {
  status: number;
  data: {
    code: number;
    message: string;
    httpStatus: string;
  };
}
