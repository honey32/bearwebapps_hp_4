import { notFound } from "next/navigation";

import { getSingleQueryParam } from "next-query-utils";

import { bodyParser } from "@repo/post/body-parser";
import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";

import "@repo/post/styles/prism.scss";
import { TocOnSide } from "../_post-detail/toc-on-side";
import { PostHeader } from "../_post-detail/post-header";
import { Toc } from "../_post-detail/toc";
import { PostFooterImage } from "../_post-detail/post-footer-image";
import { PostEyecatch } from "../_post-detail/post-eyecatch";
import { PostMain } from "../_post-detail/post-main";
import { SpColorModeSwitchWrapper } from "../_post-detail/sp-color-mode-switch-wrapper";
import { PostContent } from "../_post-detail/post-content";

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

  const parsedContent = await bodyParser.process(post.content);

  return (
    <div>
      <TocOnSide content={post.content} />

      <PostMain>
        <PostEyecatch src={post.image?.url} id={slug} />

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
    </div>
  );
}
