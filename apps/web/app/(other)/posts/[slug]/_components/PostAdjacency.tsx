import Link from "next/link";

import { styled } from "@repo/style/styled";

type Post = {
  id: string;
  title: string;
};

type Props = {
  next: Post | undefined;
  prev: Post | undefined;
};

const Tick = styled("div")`
  display: grid;
  grid-template-columns: max-content 1fr;
  text-wrap: pretty;
  word-break: auto-phrase;
  border: 1px solid transparent;
  background-color: var(--color-bg-card);
  padding: 8px 16px 12px;
  border-radius: 8px;
  gap: 0.5em;
  svg {
    transform: translate(0, 2px);
  }
  &[data-disabled] {
    color: var(--color-text-secondary);
    border-color: var(--color-border);
    background-color: unset;
  }
`;

export function PostAdjacency({ next, prev }: Props) {
  return (
    <nav
      css={`
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      `}
    >
      {prev ? (
        <Tick>
          <span>前の記事 : </span>
          <Link href={`/posts/${prev.id}`}>{prev.title}</Link>
        </Tick>
      ) : (
        <Tick data-disabled>この記事は最も古い記事です</Tick>
      )}
      {next ? (
        <Tick>
          <span>次の記事 : </span>
          <Link href={`/posts/${next.id}`}>{next.title}</Link>
        </Tick>
      ) : (
        <Tick data-disabled>この記事は最も新しい記事です</Tick>
      )}
    </nav>
  );
}
