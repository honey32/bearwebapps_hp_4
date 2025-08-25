"use client";

import { font_poppins } from "@/app/_common/fonts";
import { useScrollYDirection } from "./_use-scroll-y-direction";
import { type FC } from "react";

const pc = "@media screen and (min-width: 960px)";

export const GlobalHeader: FC = () => {
  const scrollDirection = useScrollYDirection();

  return (
    <header
      className={font_poppins.className}
      data-scroll-direction={scrollDirection}
      css={`
        border-bottom: 1px solid var(--color-border);
        background-color: var(--color-bg-modal);
        backdrop-filter: blur(4px);

        position: sticky;
        top: 0;
        z-index: 1;

        padding: 0 16px;

        /* 下スクロール中は隠す */

        transition:
          transform 300ms ease-out,
          opacity 300ms ease-out;
        transform: translate(0, 0);

        &[data-scroll-direction="down"] {
          transform: translateY(-100%);
          opacity: 0;
        }

        ${pc} {
          display: grid;
          padding: 0 32px;
          grid-template-columns: minmax(0, 54rem) 24rem;
          justify-content: center;

          --contents-margin: 0 32px;
        }
      `}
    >
      <div
        css={`
          margin: var(--contents-margin);
        `}
      >
        <h1
          css={`
            text-align: center;
            font-weight: 300;
            padding: 16px 0;
            font-size: clamp(0.8rem, 6vw, 1.5rem);

            ${pc} {
              padding: 16px 0 8px;
              text-align: unset;
            }
          `}
        >
          <a
            href="/"
            css={`
              &:is(:link, :visited, :hover, :active) {
                color: inherit;
              }
            `}
          >
            Honey32 Bear Web Apps
          </a>
        </h1>
        <div
          css={`
            display: none;
            ${pc} {
              padding: 0 0 16px;
              display: flex;
              gap: 8px;
              font-weight: 300;

              & > a:is(:link, :visited, :hover, :active) {
                color: var(--color-text-secondary);
              }
            }
          `}
        >
          <a href="https://github.com/honey32" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://twitter.com/honey321998"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a href="https://qiita.com/honey32" target="_blank" rel="noreferrer">
            Qiita
          </a>
          <a href="https://zenn.dev/honey32" target="_blank" rel="noreferrer">
            Zenn
          </a>
          <a
            href="https://scrapbox.io/honey32/"
            target="_blank"
            rel="noreferrer"
          >
            Scrapbox
          </a>
        </div>
      </div>
    </header>
  );
};
