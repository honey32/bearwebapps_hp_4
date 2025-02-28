import type { MetadataRoute } from "next";
import { microCmsRepository } from "./_repositories/posts/microCmsRepository";

const makeUrl: (s: string) => string = (() => {
  const withoutPrefix =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (!withoutPrefix) {
    throw new Error(
      "fail to get env vars either `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL`",
    );
  }

  const base = `https://${withoutPrefix}`;

  return (s) => new URL(s, base).toString();
})();

type SitemapEntry = MetadataRoute.Sitemap[number];

async function postsData(): Promise<SitemapEntry[]> {
  const posts = await microCmsRepository.getPosts({});

  return posts.contents.map((post) => ({
    url: makeUrl(`/posts/${post.id}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "daily",
    priority: 1,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: makeUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: makeUrl("/posts"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...(await postsData()),
  ];
}
