export type TCB<TValue> = (value: TValue) => void;

export type TDebauncer<TValue> = (
  value: TValue,
  cb: TCB<TValue>,
  config?: Partial<{ ms: number; onClear: () => void }>,
) => void;
