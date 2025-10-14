"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  data: HeadingData[];
};

type HeadingData = {
  depth: number;
  value: string;
  data?: {
    id?: string;
  };
};

function TocOnSide_Impl({ data }: Props) {
  // スクロールに応じて現在読んでいる章を取得する
  const [currentItem, setCurrentItem] = useState<string>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setCurrentItem(e.target.id);
        }
      },
      { rootMargin: "-20% 0% -60%" },
    );

    const targets = Array.from(document.querySelectorAll("h2,h3"));
    targets.forEach((target) => target.id && observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      css={`
        padding: 10px 16px 24px 0;
        background-color: var(--color-bg-card);
        border-radius: 8px;
      `}
    >
      <div
        css={`
          text-align: center;
        `}
      >
        この記事のコンテンツ
      </div>

      <ul
        css={`
          margin-block-start: 16px;
          list-style: none;
        `}
      >
        {data.map((heading) => {
          const id = heading?.data?.id;
          const key = `${heading.value} ${id ?? ""}`;

          return (
            <li
              key={key}
              data-depth={heading.depth}
              aria-current={currentItem === id ? "true" : "false"}
              css={`
                padding: 4px 0;
                margin-inline-start: 16px;
                font-size: 0.9rem;
                font-feature-settings: "palt", "kern";

                display: grid;
                grid-template-columns: max-content 1fr;
                align-items: first baseline;

                text-wrap: pretty;
                word-break: auto-phrase;

                a:any-link {
                  color: inherit;
                }

                color: var(--color-text-secondary);

                &[data-depth="3"] {
                  & > span:first-child {
                    margin-inline-end: 24px;
                    clip-path: circle(4px at 50% 50%);
                  }
                }

                &[aria-current="true"] {
                  color: var(--color-text-accent);

                  & > span:first-child {
                    opacity: 1;
                    background-color: var(--color-text-accent);
                  }
                }

                &:hover {
                  color: var(--color-text);

                  a {
                    text-decoration: none;
                  }
                }
              `}
            >
              <span
                css={`
                  display: inline-block;
                  width: 12px;
                  height: 12px;
                  margin-inline-end: 8px;
                  clip-path: circle(6px at 50% 50%);

                  background-color: var(--color-text);
                  opacity: 0.3;
                `}
              />
              {id ? (
                <a href={`#${id}`}>{heading.value}</a>
              ) : (
                <span>{heading.value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function TocOnSide(props: Props) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById("portal_toc_on_side"));
  }, []);

  if (!el) return null;

  return createPortal(<TocOnSide_Impl {...props} />, el);
}
