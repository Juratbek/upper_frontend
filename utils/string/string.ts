export const replaceAll = (str: string, char: string, replacement: string): string => {
  let res = str;
  while (res.includes(char)) {
    res = res.replace(char, replacement);
  }
  return res;
};
