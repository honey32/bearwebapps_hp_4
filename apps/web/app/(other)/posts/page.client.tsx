"use client";

import { type MouseEventHandler, useCallback, ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import { Clock, Tag } from "tabler-icons-react";

import { microCmsImageLoader } from "@/app/_http/microcms/image-loader";
import { font_poppins } from "@/app/_common/fonts";
import { isoStringToFormattedDateTime } from "@/app/_common/date-time-format";

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
    <main
      css={`
        padding: 16px 0;
        @media screen and (min-width: 960px) {
          margin-inline: 16px;
        }
      `}
    >
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
        <h1>投稿一覧</h1>

        {tag && (
          <p
            css={`
              margin-block-start: 16px;
            `}
          >
            タグ：「{tag.name}」
          </p>
        )}

        <p
          css={`
            margin-block-start: 16px;
          `}
        >
          {summary}
        </p>
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
            onClick={handleClickItem}
            css={`
              padding: 16px 16px;
              position: relative;
              border-radius: 8px;
              cursor: pointer;
              @media screen and (min-width: 960px) {
                padding: 32px 48px;
              }
              .backgroundImage {
                object-fit: cover;
                object-position: 0 calc(50% - 10px);
                z-index: -1;
                filter: contrast(calc(1 + var(--faded-contrast-factor) * 0.8))
                  brightness(calc(1 + var(--faded-brightness-factor) * 0.8));
              }
              &:hover .backgroundImage {
                object-position: 50% calc(50% - 5px);
                transition-duration: 1s;
                filter: contrast(calc(1 + var(--faded-contrast-factor) * 0.5))
                  brightness(calc(1 + var(--faded-brightness-factor) * 0.5));
              }
            `}
          >
            {post.image && (
              <ViewTransition name={`post-thumbnail-${post.id}`}>
                <Image
                  className="backgroundImage"
                  sizes="(min-width: 960px) 800px, 100vw"
                  src={post.image.url}
                  loader={microCmsImageLoader}
                  fill
                  alt=""
                  priority={index < 3} // above the fold であろうモノのみ true
                />
              </ViewTransition>
            )}
            <div
              className={font_poppins.className}
              css={`
                font-size: 0.8rem;
                display: flex;
                gap: 8px;
                @media screen and (min-width: 960px) {
                  font-size: 1rem;
                }
                & > span {
                  display: inline-flex;
                  align-items: center;
                }
              `}
            >
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

            <h2
              css={`
                text-wrap: pretty;
                word-break: auto-phrase;
                font-size: 1.4rem;
                line-height: 1.3;
                font-feature-settings: "palt", "kern";
                letter-spacing: 0.05rem;
                @media screen and (min-width: 960px) {
                  font-size: 1.8rem;
                }
                a:not(:hover) {
                  color: var(--color-text-accent);
                }
                a:hover {
                  color: var(--color-text-link);
                }
              `}
            >
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>

            <p
              css={`
                text-wrap: pretty;
                word-break: auto-phrase;
                font-size: 0.9rem;
                margin-block-start: 0.4rem;
                line-height: 1.5;
                @media screen and (min-width: 960px) {
                  font-size: 1rem;
                }
              `}
            >
              {post.exerpt}
            </p>

            <div
              css={`
                display: flex;
                gap: 0.25ch;
                align-items: center;
                color: var(--color-text-secondary);
                svg {
                  transform: translateY(2px);
                }
                a:not(:hover) {
                  color: inherit;
                }
              `}
            >
              <Tag size={20} />
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
