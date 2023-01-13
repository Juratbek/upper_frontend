export const uuid = (size?: number): string => crypto.randomUUID().slice(0, size);
