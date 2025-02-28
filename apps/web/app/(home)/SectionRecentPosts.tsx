import "server-only";

import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";
import { font_poppins } from "@/app/_common/fonts";
import Link from "next/link";
import { Clock } from "tabler-icons-react";
import { microCmsRepository } from "@/app/_repositories/posts/microCmsRepository";

import {
  SectionCardBase,
  SectionHeading,
  SectionHeadingMore,
  SectionHeadingWrapper,
  SectionPostDescription,
  SectionPostNumbers,
  SectionPostTitle,
} from "./_section-base";
import { HeadingLevel } from "../_heading/heading-level";
import { styled } from "@repo/style/styled";

const fetchPosts = () => microCmsRepository.getPosts({ limit: 5 });

export const preload = () => {
  void fetchPosts();
};

const SectionCard = SectionCardBase.as(HeadingLevel);
const SectionExerpt = styled(SectionPostDescription)`
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  // fallback
  max-height: 50px;

  text-wrap: pretty;
  word-break: auto-phrase;
`;

export default async function SectionRecentPosts() {
  const posts = await fetchPosts();

  return (
    <SectionCard
      as="nav"
      css={`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <SectionHeadingWrapper>
        <SectionHeading>最新の投稿</SectionHeading>
        <SectionHeadingMore href="/posts">記事一覧を見る</SectionHeadingMore>
      </SectionHeadingWrapper>

      {posts.contents.map((p) => (
        <HeadingLevel as="article" key={p.id}>
          <SectionPostTitle>
            <Link href={`/posts/${p.id}`}>{p.title}</Link>
          </SectionPostTitle>

          <SectionExerpt>
            <p>{p.exerpt}</p>
          </SectionExerpt>

          <SectionPostNumbers className={font_poppins.className}>
            <span>
              <Clock size={12} aria-label="更新日" />
              <time dateTime={p.updatedAt}>
                {isoStringToFormattedDateTime(p.updatedAt)}
              </time>
            </span>
            <span>
              <Clock size={12} aria-label="投稿日" />
              <time dateTime={p.publishedAt}>
                ({isoStringToFormattedDateTime(p.publishedAt)})
              </time>
            </span>
          </SectionPostNumbers>
        </HeadingLevel>
      ))}
    </SectionCard>
  );
}
