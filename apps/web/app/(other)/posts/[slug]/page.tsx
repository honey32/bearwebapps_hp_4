import { notFound } from "next/navigation";
import { Metadata } from "next";

import { bodyParser } from "@repo/post/body-parser";
import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import { sharedOpenGraphMetadata } from "@/app/_common/shared-og-metadata";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";

import { TocOnSide } from "../../_post-detail/toc-on-side";
import { Toc } from "../../_post-detail/toc";
import { SpColorModeSwitchWrapper } from "../../_post-detail/sp-color-mode-switch-wrapper";
import { PostMain } from "../../_post-detail/post-main";
import { PostHeader } from "../../_post-detail/post-header";
import { PostFooterImage } from "../../_post-detail/post-footer-image";
import { PostEyecatch } from "../../_post-detail/post-eyecatch";
import { PostContent } from "../../_post-detail/post-content";
import { PostAdjacency } from "../../_post-detail/post-adjacency";

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

  const parsedContent = await bodyParser.process(post.content);

  return (
    <div>
      <TocOnSide content={post.content} />

      <PostEyecatch src={post.image?.url} id={post.id} />

      <PostMain
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

        <SpColorModeSwitchWrapper>
          <ColorModeSwitch />
        </SpColorModeSwitchWrapper>

        <PostContent>
          <Toc content={post.content} />
          <div>{parsedContent.result}</div>
        </PostContent>

        <PostFooterImage src={post.image?.url} />
      </PostMain>
      <div
        css={`
          padding: 16px;
          padding-block-start: 32px;
        `}
      >
        <PostAdjacency next={post.next} prev={post.prev} />
      </div>
    </div>
  );
}
