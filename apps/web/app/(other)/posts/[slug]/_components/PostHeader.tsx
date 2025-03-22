import Link from "next/link";

import { Time } from "@/app/_common/date-time-format";
import { font_poppins } from "@/app/_common/fonts";
import { styled } from "@repo/style/styled";

type Props = {
  updatedAt: string;
  createdAt: string;
  title: string;
  tags: string[];
};

const Breadcrumb = styled("ul")`
  display: flex;
  list-style: none;
`;

const BreadcrumbItem = styled("li")`
  &::after {
    content: ">";
    color: var(--color-text-secondary);
    margin: 0 0.5rem;
  }
`;

export function PostHeader({ updatedAt, createdAt, title, tags }: Props) {
  return (
    <header
      css={`
        display: grid;
        gap: 0.5rem;
        padding-inline: var(--margin-h);
        padding-block-start: var(--margin-h);
      `}
    >
      <nav>
        <Breadcrumb        >
          <BreadcrumbItem>
            <Link href="/">ホーム</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/posts">記事一覧</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <h1
        css={`
          text-wrap: pretty;
          word-break: auto-phrase;
          font-feature-settings: "palt", "kern";
          letter-spacing: 0.05rem;
          font-size: 1.4rem;
          line-height: 1.2;

          color: var(--color-text-accent);

          @media screen and (min-width: 960px) {
            font-size: 1.8rem;
          }
        `}
      >
        {title}
      </h1>
      <div
        css={`
          color: var(--color-text-secondary);
          display: flex;
          gap: 0.5ch;

          & > a {
            color: inherit;
          }
        `}
      >
        <span className={font_poppins.className}>Tags: </span>
        {tags.map((tag) => (
          <Link key={tag} href={`/posts?tag=${tag}`}>{`#${tag}`}</Link>
        ))}
      </div>
      <div
        className={font_poppins.className}
        css={`
          color: var(--color-text-secondary);
          display: flex;
          column-gap: 1ch;
          flex-wrap: wrap;
          font-size: 0.9rem;
          line-height: 1;
        `}
      >
        <span>
          Updated at:&ensp;
          <Time dateTime={updatedAt} />
        </span>
        <span>
          Created at:&ensp;
          <Time dateTime={createdAt} />
        </span>
      </div>
    </header>
  );
}
