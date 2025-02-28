import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>404 Not Found</h2>
        <p>投稿が見つかりませんでした</p>
        <p>
          <Link href="/posts">投稿一覧に戻る</Link>
        </p>
      </div>
    </main>
  );
}
