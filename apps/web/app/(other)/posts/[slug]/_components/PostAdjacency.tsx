import Link from "next/link";
import styles from "./PostAdjacency.module.scss";

type Post = {
  id: string;
  title: string;
};

type Props = {
  next: Post | undefined;
  prev: Post | undefined;
};

export function PostAdjacency({ next, prev }: Props) {
  return (
    <nav className={styles.root}>
      {prev ? (
        <div className={styles.tick}>
          <span>前の記事 : </span>
          <Link href={`/posts/${prev.id}`}>{prev.title}</Link>
        </div>
      ) : (
        <div className={styles.tick} data-disabled>
          この記事は最も古い記事です
        </div>
      )}
      {next ? (
        <div className={styles.tick}>
          <span>次の記事 : </span>
          <Link href={`/posts/${next.id}`}>{next.title}</Link>
        </div>
      ) : (
        <div className={styles.tick} data-disabled>
          この記事は最も新しい記事です
        </div>
      )}
    </nav>
  );
}
