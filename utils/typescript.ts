// eslint-disable-next-line @typescript-eslint/naming-convention
export type ArrayElement<TArrayType extends readonly unknown[]> =
  TArrayType extends readonly (infer ElementType)[] ? ElementType : never;
