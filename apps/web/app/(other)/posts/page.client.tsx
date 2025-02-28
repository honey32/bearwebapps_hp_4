"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { Clock, Tag } from "tabler-icons-react";
import clsx from "clsx";
import { font_poppins } from "@/app/_common/fonts";
import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";
import Image from "next/image";
import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";

type Props = {
  tag: { name: string } | undefined;
  summary: string;
  contents: Array<{
    id: string;
    image?: { url: string } | undefined;
    updatedAt: string;
    publishedAt: string;
    title: string;
    exerpt: string;
    tags: Array<{ name: string }>;
  }>;
};

export default function PostsIndexPageClient({
  tag,
  summary,
  contents,
}: Props) {
  return (
    <main className={styles.root}>
      <h1 className={styles.heading}>投稿一覧</h1>

      {tag && <p className={styles.tag}>タグ：「{tag.name}」</p>}

      <p className={styles.summary}>{summary}</p>

      {contents.map((post, index) => (
        <article key={post.id} className={styles.post}>
          {post.image && (
            <Image
              className={styles.backgroundImage}
              sizes="(min-width: 960px) 800px, 100vw"
              src={post.image.url}
              loader={microCmsImageLoader}
              fill
              alt=""
              priority={index < 3} // above the fold であろうモノのみ true
            />
          )}
          <div className={clsx(styles.postNumbers, font_poppins.className)}>
            <span>
              <Clock size={12} aria-label="更新日" />
              <time dateTime={post.updatedAt}>
                {isoStringToFormattedDateTime(post.updatedAt)}
              </time>
            </span>
            <span>
              <Clock size={12} aria-label="投稿日" />
              <time dateTime={post.publishedAt}>
                ({isoStringToFormattedDateTime(post.publishedAt)})
              </time>
            </span>
          </div>

          <h2 className={styles.postTitle}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>

          <p className={styles.postDesc}>{post.exerpt}</p>

          <div className={styles.tags}>
            <Tag size={20} className={styles.tagsIcon} />
            {post.tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/posts?tag=${tag.name}`}
              >{`#${tag.name}`}</Link>
            ))}
          </div>
        </article>
      ))}
    </main>
  );
}
