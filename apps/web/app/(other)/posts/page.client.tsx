"use client";

import { type MouseEventHandler, useCallback, ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import { Clock, Tag } from "tabler-icons-react";
import clsx from "clsx";

import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";
import { font_poppins } from "@/app/_common/fonts";
import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";

import styles from "./page.module.scss";

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

const pc = `@media screen and (min-width: 960px)`;

export default function PostsIndexPageClient({
  tag,
  summary,
  contents,
}: Props) {
  const handleClickItem: MouseEventHandler = useCallback((event) => {
    // Link area delegation を実現するための、クリックイベント処理
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === "A") return;

    event.currentTarget.querySelector("a")?.click();
  }, []);

  return (
    <main className={styles.root}>
      <div
        css={`
          display: grid;
          gap: 16px;
          padding: 16px;

          ${pc} {
            padding: 16px 48px;
          }
        `}
      >
        <h1 className={styles.heading}>投稿一覧</h1>

        {tag && <p className={styles.tag}>タグ：「{tag.name}」</p>}

        <p className={styles.summary}>{summary}</p>
      </div>

      <div
        css={`
          display: grid;
          gap: 16px;
          ${pc} {
            gap: 0;
          }
        `}
      >
        {contents.map((post, index) => (
          <article
            key={post.id}
            className={styles.post}
            onClick={handleClickItem}
          >
            {post.image && (
              <ViewTransition name={`post-thumbnail-${post.id}`}>
                <Image
                  className={styles.backgroundImage}
                  sizes="(min-width: 960px) 800px, 100vw"
                  src={post.image.url}
                  loader={microCmsImageLoader}
                  fill
                  alt=""
                  priority={index < 3} // above the fold であろうモノのみ true
                />
              </ViewTransition>
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
      </div>
    </main>
  );
}
