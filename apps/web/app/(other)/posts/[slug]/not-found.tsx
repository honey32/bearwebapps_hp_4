import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      css={`
        padding: 16px;
      `}
    >
      <div
        css={`
          margin-block-start: 16px;
          border: 1px solid var(--color-border);
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          & > h2 {
            font-size: 2.5rem;
          }
          & > p {
            margin-block: 1rem;
          }
        `}
      >
        <h2>404 Not Found</h2>
        <p>投稿が見つかりませんでした</p>
        <p>
          <Link href="/posts">投稿一覧に戻る</Link>
        </p>
      </div>
    </main>
  );
}
