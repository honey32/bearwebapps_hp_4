import "server-only";

import { ExternalLink, Heart, Clock, MessageDots } from "tabler-icons-react";

import { zennFetcher } from "@/app/_repositories/zenn/ZennClient";
import { font_poppins } from "@/app/_common/fonts";
import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";

import { HeadingLevel } from "../_heading/heading-level";

import {
  SectionCardBase,
  SectionHeading,
  SectionHeadingMore,
  SectionHeadingWrapper,
  SectionPostNumbers,
  SectionPostTitle,
} from "./_section-base";

const fetchPosts = async () => {
  const response = await zennFetcher.userArticles(
    { username: "honey32", count: 5, order: "latest" },
    {
      next: { revalidate: 60 },
    },
  );

  return response.articles;
};

export const preload = () => {
  void fetchPosts();
};

const SectionCard = SectionCardBase.as(HeadingLevel);

export default async function SectionZenn() {
  const posts = await fetchPosts();

  return (
    <SectionCard
      as="section"
      css={`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <SectionHeadingWrapper>
        <SectionHeading>Zenn/最近の投稿</SectionHeading>
        <SectionHeadingMore href="https://zenn.dev/honey32" target="_blank">
          もっと見る
          <ExternalLink size={18} />
        </SectionHeadingMore>
      </SectionHeadingWrapper>

      {posts.map((p) => (
        <HeadingLevel as="article" key={p.id}>
          <SectionPostTitle>
            <a
              href={`https://zenn.dev${p.path}`}
              target="_blank"
              rel="noreferrer"
            >
              {p.title}
              <ExternalLink size={18} />
            </a>
          </SectionPostTitle>

          <SectionPostNumbers className={font_poppins.className}>
            <span>
              <Heart size={12} aria-label="いいね数" />
              {p.liked_count}
            </span>
            <span>
              <MessageDots size={12} aria-label="コメント数" />
              {p.comments_count}
            </span>
            <span>
              <Clock size={12} aria-label="更新日" />
              <time dateTime={p.body_updated_at}>
                {isoStringToFormattedDateTime(p.body_updated_at)}
              </time>
            </span>
            <span>
              <Clock size={12} aria-label="作成日" />
              <time dateTime={p.published_at}>
                ({isoStringToFormattedDateTime(p.published_at)})
              </time>
            </span>
          </SectionPostNumbers>
        </HeadingLevel>
      ))}
    </SectionCard>
  );
}
