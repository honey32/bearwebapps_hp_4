import type { Metadata } from "next";

import { getSingleQueryParam } from "next-query-utils";

import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import { sharedOpenGraphMetadata } from "@/app/_common/shared-og-metadata";

import PostsIndexPageClient from "./page.client";

export const metadata: Metadata = {
  title: "投稿一覧",
  openGraph: {
    ...sharedOpenGraphMetadata,
    title: "投稿一覧",
    url: `/posts`,
    type: "article",
  },
};

const fetchTag = async ({ tagName }: { tagName: string }) => {
  return await microCmsRepository.getSingleTag({ tagName });
};

const fetchPosts = async (options: { tagId?: string }) => {
  return await microCmsRepository.getPosts(options);
};

export default async function PostsIndexPage(props: PageProps<"/posts">) {
  const searchParams = await props.searchParams;
  const tagName = getSingleQueryParam(searchParams, "tag");
  const tag = tagName ? await fetchTag({ tagName }) : undefined;
  const { offset, limit, totalCount, contents } = await fetchPosts({
    tagId: tag?.id,
  });

  const summary = (() => {
    const start = offset + 1;
    const end = Math.min(totalCount, offset + limit);
    return `${start}–${end} / 全${totalCount}件`;
  })();

  return (
    <PostsIndexPageClient tag={tag} summary={summary} contents={contents} />
  );
}
