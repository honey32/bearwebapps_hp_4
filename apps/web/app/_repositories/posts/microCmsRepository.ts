import { microCmsContentsMock } from "./microCmsContentsMock";
import { microCmsClient } from "./microCmsClient";

type ISODatetimeString = string;

type Post = {
  id: string;
  createdAt: ISODatetimeString;
  updatedAt: ISODatetimeString;
  publishedAt: ISODatetimeString;
  title: string;
  content: string;
  exerpt: string;
  tags: { name: string }[];
  image?: {
    url: string;
    height: number;
    width: number;
  };
};

type Tag = {
  id: string;
  name: string;
  parent?: string;
};

type ResponseTypes = {
  getPosts: {
    contents: Post[];
    totalCount: number;
    offset: number;
    limit: number;
  };
  getSinglePost:
    | (Post & {
        prev?: Pick<Post, "title" | "id">;
        next?: Pick<Post, "title" | "id">;
      })
    | undefined;
  getTags: {
    contents: Tag[];
    totalCount: number;
    offset: number;
    limit: number;
  };
  getSingleTag: Tag | undefined;
};

const prod_microCmsRepository = {
  getPosts: (
    options: { tagId?: string; orders?: string; limit?: number },
    init?: RequestInit,
  ): Promise<ResponseTypes["getPosts"]> => {
    const params = new URLSearchParams([]);
    if (options.tagId) {
      params.append("filters", `tags[contains]${options.tagId}`);
    }
    params.append("orders", options.orders ?? "-publishedAt");
    if (options.limit) {
      params.append("limit", options.limit.toFixed());
    }

    return microCmsClient(`/posts?${params}`, init);
  },

  // getPreviewPost は、本番環境では使わない
  getPreviewPost: async (
    options: { slug: string; draftKey: string },
    init?: RequestInit,
  ): Promise<Post> => {
    throw new Error("preview is invalid");
  },

  getSinglePost: async (
    { slug }: { slug: string },
    init?: RequestInit,
  ): Promise<ResponseTypes["getSinglePost"]> => {
    const posts: ResponseTypes["getPosts"] = await microCmsClient(
      "/posts?orders=-publishedAt",
      init,
    );
    const { contents } = posts;
    const index = contents.findIndex((record) => record.id === slug);
    if (index === -1) return undefined;

    const post = contents[index]!;
    const summerize = (entry: undefined | typeof post) => {
      if (!entry) return undefined;
      const { id, title } = entry;
      return {
        id,
        title,
      };
    };

    const prev = contents[index + 1];
    const next = contents[index - 1];
    return { ...post, prev: summerize(prev), next: summerize(next) };
  },

  getSingleTag: async (
    { tagName }: { tagName: string },
    init?: RequestInit,
  ): Promise<ResponseTypes["getSingleTag"]> => {
    const params = new URLSearchParams([
      ["filters", `name[equals]${tagName}`],
      ["limit", "1"],
    ]);

    const tags: ResponseTypes["getTags"] = await microCmsClient(
      `/tags?${params}`,
      init,
    );

    return tags.contents[0];
  },
};

const mock_microCmsRepository: typeof prod_microCmsRepository = {
  getPosts: async () => {
    const contents = microCmsContentsMock;
    return { contents, offset: 0, limit: 10, totalCount: contents.length };
  },

  getPreviewPost: async (
    { slug, draftKey }: { slug: string; draftKey: string },
    init?: RequestInit,
  ): Promise<Post> => {
    const post: Promise<Post> = await microCmsClient(
      `/posts/${slug}?draftKey=${draftKey}`,
      init,
    );
    return post;
  },

  getSinglePost: async ({ slug }) => {
    const contents = microCmsContentsMock;
    const index = contents.findIndex((record) => record.id === slug);
    if (index === -1) return undefined;

    const post = contents[index]!;

    const summerize = (entry: undefined | typeof post) => {
      if (!entry) return undefined;
      const { id, title } = entry;
      return {
        id,
        title,
      };
    };
    const prev = contents[index + 1];
    const next = contents[index - 1];
    return { ...post, prev: summerize(prev), next: summerize(next) };
  },

  getSingleTag: async ({ tagName }) => {
    return { name: tagName, id: `TAG_${tagName}`, parent: undefined };
  },
};

export const microCmsRepository =
  process.env.NODE_ENV === "development"
    ? mock_microCmsRepository
    : prod_microCmsRepository;
