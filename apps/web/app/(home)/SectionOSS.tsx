import { ReactNode } from "react";
import { ExternalLink } from "tabler-icons-react";
import { HeadingLevel } from "../_heading/heading-level";

import {
  SectionCardBase,
  SectionHeading,
  SectionHeadingWrapper,
  SectionPostDescription,
  SectionPostTitle,
} from "./_section-base";

type Library = {
  id: string;
  title: string;
  url: string;
  description: ReactNode;
};

const libraries: Library[] = [
  {
    id: "aspida-swr-adapter",
    title: "aspida-swr-adapter",
    url: "https://github.com/honey32/aspida-swr-adapter",
    description: (
      <>
        <p>
          <a href="https://github.com/aspida/aspida">aspida</a>・
          <a href="https://github.com/vercel/swr">@vercel/swr</a>&ensp;
          と組み合わせて使用することで、条件付きレンダリング・クエリパラメータ等の指定が書きやすくなるライブラリです。
        </p>
        <p>
          <code>useSWRImmutable</code> や <code>useSWRInfinite</code>&ensp;
          にも対応しています。
        </p>
      </>
    ),
  },
  {
    id: "next-query-utils",
    title: "next-query-utils",
    url: "https://github.com/honey32/next-query-utils",
    description: (
      <p>
        Next.js （<code>/page</code>&ensp;
        Router）のクエリパラメータを操作するためのユーティリティ関数群が含まれます。
      </p>
    ),
  },
];

const SectionArticleCard = SectionCardBase.as(HeadingLevel);

export default function SectionOSS() {
  return (
    <HeadingLevel
      as="section"
      css={`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <SectionHeadingWrapper>
        <SectionHeading>OSS活動</SectionHeading>
      </SectionHeadingWrapper>

      {libraries.map((lib) => (
        <SectionArticleCard as="article" key={lib.url}>
          <SectionPostTitle>
            <a href={lib.url}>
              {lib.title}
              <ExternalLink size={18} />
            </a>
          </SectionPostTitle>

          <SectionPostDescription>{lib.description}</SectionPostDescription>
        </SectionArticleCard>
      ))}
    </HeadingLevel>
  );
}
