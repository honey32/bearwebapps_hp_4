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
        // scroll-target-group / :target-current を使って、スクロール位置に基づいた目次項目の強調を実現している
        css={`
          margin-block-start: 16px;
          list-style: none;
          scroll-target-group: auto;
        `}
      >
        {data.map((heading) => {
          const id = heading?.data?.id;
          const key = `${heading.value} ${id ?? ""}`;

          return (
            <li
              key={key}
              data-depth={heading.depth}
              css={`
                padding: 4px 0;
                margin-inline-start: 16px;
                font-size: 0.9rem;
                font-feature-settings: "palt", "kern";
                color: var(--_text-color);
                text-wrap: pretty;
                word-break: auto-phrase;

                display: grid;
                grid-template-columns: max-content 1fr;
                align-items: first baseline;

                --_text-color: var(--color-text-secondary);
                --_mark-opacity: 0.3;

                &[data-depth="3"] > span:first-child {
                  margin-inline-end: 24px;
                  clip-path: circle(4px at 50% 50%);
                }
                &:has(a:target-current) {
                  --_text-color: var(--color-text-accent);
                  --_mark-opacity: 1;
                }
                &:hover {
                  --_text-color: var(--color-text);
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

                  background-color: currentColor;
                  opacity: var(--mark-opacity);
                `}
              />
              {id ? (
                <a
                  href={`#${id}`}
                  css={`
                    &:any-link {
                      /* 詳細度を上げてデフォルトに勝つため */
                      color: inherit;
                      text-decoration: none;
                    }
                  `}
                >
                  {heading.value}
                </a>
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
