/**
 * 2つのクラス文字列を連結する
 */
export const clsx2 = (c1: string, c2: string | undefined | null): string => {
  let result = c1;
  if (c2) {
    result += " " + c2;
  }
  return result;
};
