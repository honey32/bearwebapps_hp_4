import { microCmsClient } from "@/app/_http/microcms/client";

import { type prod_postsRepository, TAG_MICROCMS_POSTS } from "../_prod";

import { microCmsContentsMock } from "./contents";

export const mock_postsRepository: typeof prod_postsRepository = {
  getPosts: async () => {
    const contents = microCmsContentsMock;
    return { contents, offset: 0, limit: 10, totalCount: contents.length };
  },

  getPreviewPost: async (
    { slug, draftKey }: { slug: string; draftKey: string },
    init?: RequestInit,
  ) => {
    const post = await microCmsClient(
      `/posts/${slug}?draftKey=${draftKey}`,
      init,
      [TAG_MICROCMS_POSTS],
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
