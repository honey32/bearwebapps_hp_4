import { notFound } from "next/navigation";

import { getSingleQueryParam } from "next-query-utils";

import { bodyParser } from "@repo/post/body-parser";
import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";

import { TocOnSide } from "../posts/[slug]/_toc-on-side";
import { PostHeader } from "../posts/[slug]/_post-header";
import "@repo/post/styles/prism.scss";
import { Toc } from "../posts/[slug]/_toc";
import { PostFooterImage } from "../posts/[slug]/_post-footer-image";
import { PostEyecatch } from "../posts/[slug]/_post-eyecatch";
import {
  postMainStyle,
  colorModeSwitchStyle,
  postContentStyle,
} from "../_post-styles";

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

      <main css={postMainStyle}>
        <PostEyecatch src={post.image?.url} id={slug} />

        <PostHeader
          updatedAt={post.updatedAt}
          createdAt={post.publishedAt}
          title={post.title}
          tags={post.tags.map((tag) => tag.name)}
        />

        <div css={colorModeSwitchStyle}>
          <ColorModeSwitch />
        </div>

        <div css={postContentStyle}>
          <Toc content={post.content} />
          <div>{parsedContent.result}</div>
        </div>

        <PostFooterImage src={post.image?.url} />
      </main>
    </div>
  );
}
