import "server-only";

const baseUrl = process.env.MICROCMS_API_BASE_URL!;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY!;

export const microCmsClient = async (
  path: string,
  init: RequestInit | undefined,
  tags: string[] | undefined,
) => {
  // なぜか new URL(path, baseUrl) を使うとうまくいかない。
  const response = await fetch(baseUrl + path, {
    ...init,
    next: { ...init?.next, tags: safeConcat(init?.next?.tags, tags) },
    headers: {
      "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
      ...init?.headers,
    },
  });
  if (!response.ok) throw new Error(JSON.stringify(await response.json()));
  return response.json();
};

const safeConcat = (left: string[] = [], right: string[] = []) =>
  left.concat(right);
