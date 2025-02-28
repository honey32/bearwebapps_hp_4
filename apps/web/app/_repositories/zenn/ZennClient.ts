type IsoDateString = string;

type ZennArticleType = {
  id: number;
  post_type: "Article";
  title: string;
  slug: string;
  published: boolean;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: false;
  published_at: IsoDateString;
  body_updated_at: IsoDateString;
  source_repo_updated_at: IsoDateString;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  publication: null | {
    id: number;
    name: string;
    avatar_small_url: string;
    display_name: string;
    beta_stats: boolean;
    avatar_registered: boolean;
  };
};

export type ResponseTypes = {
  "articles?username": {
    options: {
      username?: string;
      count: number;
      order: "latest";
    };
    result: { articles: ZennArticleType[]; next_page: null };
  };
};

export const zennFetcher = {
  userArticles: async (
    options: ResponseTypes["articles?username"]["options"],
    init?: RequestInit,
  ): Promise<ResponseTypes["articles?username"]["result"]> => {
    const params = new URLSearchParams([
      options.username ? ["username", options.username] : [],
      ["count", options.count.toString()],
      ["order", options.order],
    ]);
    const url = `https://zenn.dev/api/articles?${params}`;

    const response = await fetch(url, init);

    if (!response.ok) throw await response.json();
    return await response.json();
  },
};
