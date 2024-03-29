export type TParamValue = string | string[] | undefined;

export interface ILocation {
  host: string;
  origin: string;
}
export interface IUseUrl {
  getParam: (name: string) => TParamValue;
  setParam: (name: string, value: TParamValue | number) => void;
  setParams: (params: { [name: string]: TParamValue }) => void;
  location: ILocation;
  isReady: boolean;
}
