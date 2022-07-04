const ABBREVATIONS = [
  {
    dozen: 3,
    suffix: 'Ming',
  },
  {
    dozen: 6,
    suffix: 'Million',
  },
];

export function formatToKMB(num: number): string {
  return ABBREVATIONS.reduce((res, abbrevation) => {
    const limit = 10 ** abbrevation.dozen;
    if (num >= limit) {
      return `${Math.round(num / limit)} ${abbrevation.suffix}`;
    }
    return res;
  }, String(num));
}
