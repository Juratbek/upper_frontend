export type TParamValue = string | string[] | undefined;

export interface IUseUrl {
  getParam: (name: string) => TParamValue;
  setParam: (name: string, value: TParamValue) => void;
  isReady: boolean;
}
