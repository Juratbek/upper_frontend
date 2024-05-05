export const uuid = (size?: number): string => {
  if (size && size < 8) console.error('Please create UUID with minimum length of 8');
  return crypto.randomUUID().slice(0, size);
};
