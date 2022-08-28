// eslint-disable-next-line @typescript-eslint/naming-convention
export type Override<T, R> = Omit<T, keyof R> & R;
