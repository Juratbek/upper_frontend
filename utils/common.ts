export const getClassName = (...classNames: string[]): string => classNames.join(' ');

export const isClientSide = (): boolean => !!window;
