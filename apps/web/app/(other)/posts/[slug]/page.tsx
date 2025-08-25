import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";
import { sharedOpenGraphMetadata } from "@/app/_common/shared-og-metadata";
import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { markdownBodyParser } from "./_md/markdownBodyParser";
import styles from "./page.module.scss";
import { PostAdjacency } from "./_components/PostAdjacency";
import Toc from "./_components/Toc";
import TocOnSideContainer from "./_components/TocOnSideContainer";
import { PostEyecatch } from "./_components/PostEyecatch";
import { PostFooterImage } from "./_components/PostFooterImage";
import { PostHeader } from "./_post-header";

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await microCmsRepository.getPosts({ limit: 100 });
  return posts.contents.map((post) => ({ slug: post.id }));
}

const fetchPost = (params: Params) => {
  return microCmsRepository.getSinglePost(params);
};

export async function generateMetadata(
  props: PageProps<"/posts/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const post = await fetchPost({ slug: params.slug });
  if (!post) return {};
  return {
    title: post.title,
    openGraph: {
      ...sharedOpenGraphMetadata,
      title: post.title,
      url: `/posts/${params.slug}`,
      type: "article",
      ...(post.image && { images: post.image.url }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@honey321998",
    },
  } satisfies Metadata;
}

export default async function PostDetailPage(
  props: PageProps<"/posts/[slug]">,
) {
  const params = await props.params;
  const post = await fetchPost({ slug: params.slug });

  if (!post) {
    notFound();
  }

  const parsedContent = await markdownBodyParser.process(post.content);

  return (
    <div>
      <Suspense>
        <TocOnSideContainer content={post.content} />
      </Suspense>

      <PostEyecatch src={post.image?.url} id={post.id} />

      <main
        className={styles.main}
        // Sass が starting-style を認識してくれないので、この部分のみ自作 css-in-js で対応
        css={`
          opacity: 1;
          transition: opacity 0.5s 0.2s ease-out;
          @starting-style {
            opacity: 0;
          }
        `}
      >
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
      <div className={styles.nav}>
        <PostAdjacency next={post.next} prev={post.prev} />
      </div>
    </div>
  );
}
