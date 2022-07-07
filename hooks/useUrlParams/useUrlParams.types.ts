export type TParamValue = string | string[] | undefined;

export interface IUseUrlParams {
  getParam: (name: string) => TParamValue;
  setParam: (name: string, value: TParamValue) => void;
}
