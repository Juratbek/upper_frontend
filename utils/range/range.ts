export const range = (start: number, end: number): Array<number> => {
  const length: number = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};
