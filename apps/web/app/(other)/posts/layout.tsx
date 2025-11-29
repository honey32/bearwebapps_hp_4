import { Suspense } from "react";
import Image from "next/image";

import { myProfile } from "@/app/_my_profile/myProfile";
import { font_poppins } from "@/app/_common/fonts";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";
import SectionRecentPosts from "@/app/(home)/SectionRecentPosts";

import Layout_InvisibleOnRoot from "./Layout_InvisibleOnRoot";

export default function Layout({ children }: LayoutProps<"/posts">) {
  return (
    <div
      css={`
        display: grid;
        position: relative;
        z-index: 0;
        padding-block-end: 64px;
        grid-template-columns: minmax(0, 50rem);
        justify-content: center;
        @media screen and (min-width: 960px) {
          padding-inline-end: 32px;
          column-gap: 32px;
          grid-template-columns: minmax(0, 54rem) 24rem;
        }
      `}
    >
      {/* 1 主要カラム */}
      <div>{children}</div>
      {/* 2 右サイドカラム */}
      <aside
        css={`
          padding: 16px 0;
          padding-block-start: 32px;
          & > * + * {
            margin-block-start: 16px;
          }
        `}
      >
        <div
          css={`
            display: grid;
            align-items: center;
          `}
        >
          <ColorModeSwitch />
        </div>

        {/* 2-1 プロフィールカード */}
        <div
          css={`
            border-radius: 8px;
            padding: 16px;
            padding-block-end: 20px;
            background-color: var(--color-bg-card);
            font-size: 0.9rem;
            & > div:first-child {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            img {
              display: block;
              border-radius: 100%;
            }
            p,
            li {
              text-wrap: pretty;
              word-break: auto-phrase;
            }
            p,
            ul,
            h3 {
              margin-top: 0.5rem;
            }
            ul {
              margin-left: 1rem;
            }
            p,
            ul,
            ol {
              line-height: 1.5;
            }
            h1,
            h2,
            h3 {
              line-height: 1.1;
            }
            h3,
            h4 {
              line-height: 1.5;
            }
          `}
        >
          <div>
            <Image src="/Honeycomb_2.png" width={60} height={60} alt="" />
            <h2 className={font_poppins.className}>Honey32</h2>
          </div>
          {myProfile}
        </div>

        <div
          css={`
            position: sticky;
            top: 120px;
          `}
        >
          <div
            id="portal_toc_on_side"
            css={`
              display: none;
              @media screen and (min-width: 960px) {
                display: block;
                margin-bottom: 16px;
              }
            `}
          />

          {/* 2-2 最新の投稿 */}
          <Layout_InvisibleOnRoot>
            <Suspense>
              <SectionRecentPosts />
            </Suspense>
          </Layout_InvisibleOnRoot>
        </div>
      </aside>
    </div>
  );
}
