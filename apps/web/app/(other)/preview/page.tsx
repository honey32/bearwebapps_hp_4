import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getSingleQueryParam } from "next-query-utils";

import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";

import { PostHeader } from "../posts/[slug]/_post-header";
import { markdownBodyParser } from "../posts/[slug]/_md/markdownBodyParser";
import TocOnSideContainer from "../posts/[slug]/_components/TocOnSideContainer";
import Toc from "../posts/[slug]/_components/Toc";
import { PostFooterImage } from "../posts/[slug]/_components/PostFooterImage";
import { PostEyecatch } from "../posts/[slug]/_components/PostEyecatch";

import styles from "../posts/[slug]/page.module.scss";

const fetchPost = (params: { slug: string; draftKey: string }) => {
  return microCmsRepository.getPreviewPost(params).catch(() => {
    // プレビューデータ取得中のエラーは、notFound で隠す。
    notFound();
  });
};

export default async function Page(props: PageProps<"/preview">) {
  const searchParams = await props.searchParams;
  const slug = getSingleQueryParam(searchParams, "contentId");
  const draftKey = getSingleQueryParam(searchParams, "draftKey");

  if (!slug) notFound();
  if (!draftKey) notFound();

  const post = await fetchPost({
    slug,
    draftKey,
  });

  const parsedContent = await markdownBodyParser.process(post.content);

  return (
    <div>
      <Suspense>
        <TocOnSideContainer content={post.content} />
      </Suspense>

      <main className={styles.main}>
        <PostEyecatch src={post.image?.url} id={slug} />

        <PostHeader
          updatedAt={post.updatedAt}
          createdAt={post.publishedAt}
          title={post.title}
          tags={post.tags.map((tag) => tag.name)}
        />

        <div className={styles.colorModeSwitch}>
          <ColorModeSwitch />
        </div>

        <div className={styles.content}>
          <Toc content={post.content} />
          <div>{parsedContent.result}</div>
        </div>

        <PostFooterImage src={post.image?.url} />
      </main>
    </div>
  );
}
