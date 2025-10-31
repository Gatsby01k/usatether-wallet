export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
export const pretty = (v: string | number, d = 4) =>
  Number(v).toLocaleString(undefined, { maximumFractionDigits: d });
