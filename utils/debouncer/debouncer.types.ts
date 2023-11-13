export type TCB<TValue> = (value: TValue) => unknown;

export type TDebauncer<TValue> = (
  value: TValue,
  cb: TCB<TValue>,
  config?: Partial<{ ms: number; onClear: () => unknown }>,
) => void;
