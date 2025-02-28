import clsx from "clsx";
import Link from "next/link";

import { Time } from "@/app/_common/date-time-format";
import { font_poppins } from "@/app/_common/fonts";

import styles from "./PostHeader.module.scss";

type Props = {
  updatedAt: string;
  createdAt: string;
  title: string;
  tags: string[];
};

export function PostHeader({ updatedAt, createdAt, title, tags }: Props) {
  return (
    <header>
      <div className={clsx(styles.dates, font_poppins.className)}>
        <span>
          Updated at:&ensp;
          <Time dateTime={updatedAt} />
        </span>
        <span>
          Created at:&ensp;
          <Time dateTime={createdAt} />
        </span>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tags}>
        <span>Tags: </span>
        {tags.map((tag) => (
          <Link key={tag} href={`/posts?tag=${tag}`}>{`#${tag}`}</Link>
        ))}
      </div>
    </header>
  );
}
