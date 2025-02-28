import "server-only";

const baseUrl = process.env.MICROCMS_API_BASE_URL!;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY!;

export const TAG_MICROCMS_POSTS = "microcms-posts";

export const microCmsClient = async (path: string, init?: RequestInit) => {
  const mergedInit: RequestInit = {
    ...init,
    next: { tags: [TAG_MICROCMS_POSTS] },
    headers: {
      "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
      ...init?.headers,
    },
  };
  const response = await fetch(baseUrl + path, mergedInit);

  if (!response.ok) throw await response.json();
  return response.json();
};
