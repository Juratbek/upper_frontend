export type TArrayElement<TArrayType extends readonly unknown[]> =
  TArrayType extends readonly (infer ElementType)[] ? ElementType : never;
