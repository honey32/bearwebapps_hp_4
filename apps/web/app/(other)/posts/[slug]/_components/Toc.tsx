import { tocParser } from "@repo/post/toc-parser";

type Props = {
  content: string;
};

type HeadingData = {
  depth: number;
  value: string;
  data?: {
    id?: string;
  };
};

export default async function Toc({ content }: Props) {
  const toc = await tocParser.process(content);

  const headings = toc.data.headings as HeadingData[];

  if (headings.length === 0) return null;

  return (
    <nav
      css={`
        padding-inline: 16px;
        margin-block: 4rem;
      `}
    >
      <div
        css={`
          border: 1px solid var(--color-text-accent);
          background-color: var(--color-bg-card);
          border-radius: 8px;
          max-width: 420px;
          margin-inline: auto;
          font-feature-settings: "palt", "kern";
        `}
      >
        <div
          css={`
            text-align: center;
            margin-top: 0.75rem;
            color: var(--color-text-accent);
            font-weight: bold;
          `}
        >
          この記事のコンテンツ
        </div>

        <ul
          css={`
            text-wrap: pretty;
            word-break: auto-phrase;
            margin-block-start: 1rem;
            margin-block-end: 1.5rem;
            margin-inline: 16px;
            font-feature-settings: inherit;
            li {
              list-style: none;
              line-height: 1.5;
              padding-block: 6px;
              a {
                color: inherit;
              }
              &[data-depth="3"] {
                padding-inline-start: 24px;
                padding-block: 2px;
                font-size: 0.9rem;
                margin-block-start: -2px;
              }
            }
          `}
        >
          {headings.map((heading) => {
            const id = heading?.data?.id;
            const key = `${heading.value} ${id ?? ""}`;

            return (
              <li key={key} data-depth={heading.depth}>
                {id ? (
                  <a href={`#${id}`}>{heading.value}</a>
                ) : (
                  <span>{heading.value}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
