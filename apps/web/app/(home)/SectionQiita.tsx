import "server-only";

import { ExternalLink, Heart, Folder, Clock } from "tabler-icons-react";
import { font_poppins } from "@/app/_common/fonts";
import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";
import {
  SectionCardBase,
  SectionHeading,
  SectionHeadingMore,
  SectionHeadingWrapper,
  SectionPostNumbers,
  SectionPostTitle,
} from "./_section-base";
import { HeadingLevel } from "../_heading/heading-level";

type Post = {
  title: string;
  id: string;
  url: string;
  body: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  stocks_count: number;
  tags: { name: string }[];
};

const fetchPosts = async (): Promise<Post[]> => {
  const params = new URLSearchParams([
    ["page", "1"],
    ["per_page", "5"],
    ["query", "user:honey32"],
  ]);
  const result = await fetch(
    "https://qiita.com/api/v2/items?" + params.toString(),
  );
  const posts = await result.json();
  //   const posts = [
  //     { title: "あああ", body: "あいうえお", created_at: "2023-03-11", url: "" },
  //   ] satisfies Post[];
  return posts as unknown as Post[];
};

export const preload = () => {
  void fetchPosts();
};

const SectionCard = SectionCardBase.as(HeadingLevel);

export default async function SectionQiita() {
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
        <SectionHeading>Qiita/最近の投稿</SectionHeading>
        <SectionHeadingMore href="https://qiita.com/honey32" target="_blank">
          もっと見る
          <ExternalLink size={18} />
        </SectionHeadingMore>
      </SectionHeadingWrapper>

      {posts.map((p) => (
        <HeadingLevel as="article" key={p.id}>
          <SectionPostTitle>
            <a href={p.url} target="_blank">
              {p.title}
              <ExternalLink size={18} />
            </a>
          </SectionPostTitle>

          <SectionPostNumbers className={font_poppins.className}>
            <span>
              <Heart size={12} aria-label="いいね数" />
              {p.likes_count}
            </span>
            <span>
              <Folder size={12} aria-label="ストック数" />
              {p.stocks_count}
            </span>
            <span>
              <Clock size={12} aria-label="更新日" />
              <time dateTime={p.updated_at}>
                {isoStringToFormattedDateTime(p.updated_at)}
              </time>
            </span>
            <span>
              <Clock size={12} aria-label="作成日" />
              <time dateTime={p.created_at}>
                ({isoStringToFormattedDateTime(p.created_at)})
              </time>
            </span>
          </SectionPostNumbers>
        </HeadingLevel>
      ))}
    </SectionCard>
  );
}
