import { Activity, FC, ReactNode, ViewTransition } from "react";

import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";
import SectionRecentPosts from "@/app/(home)/SectionRecentPosts";

import { ProfileCard } from "./profile-card";

const transitionNames = {
  toc: "blog-pseudo-layout-toc",
  recentPosts: "blog-pseudo-layout-recent-posts",
};

const cssVars = {
  /**
   * Toc を表示したい場合は、表示のしかたを示す display 値を指定。
   * 非表示の場合は `none` を指定。
   */
  tocDisplay: "--c-toc-display",
};

const css = String.raw;
const vstack16 = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

type Props = {
  children: ReactNode;
  showRecentPosts?: boolean | undefined | null;
  tocElement?: ReactNode | undefined | null;
};

export const BlogPseudoLayout: FC<Props> = ({
  children,
  showRecentPosts = false,
  tocElement,
}) => {
  return (
    <div
      css={`
        display: grid;
        position: relative;
        z-index: 0;
        padding-block-end: 0 0 64px;
        grid-template-columns: minmax(0, 50rem);
        justify-content: center;
        ${cssVars.tocDisplay}: none;
        @media screen and (min-width: 960px) {
          padding-inline-end: 32px;
          column-gap: 32px;
          grid-template-columns: minmax(0, 54rem) 24rem;
          ${cssVars.tocDisplay}: block;
        }
      `}
    >
      {/* 1 主要カラム */}
      <div>{children}</div>
      {/* 2 右サイドカラム */}
      <aside
        css={`
          padding: 32px 0 16px;
          ${vstack16}
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

        <ProfileCard />

        <div
          css={`
            position: sticky;
            top: 120px;
          `}
        >
          <div css={vstack16}>
            <ViewTransition name={transitionNames.toc}>
              <div
                css={`
                  display: none;
                  &:not(:empty) {
                    display: var(${cssVars.tocDisplay});
                  }
                `}
              >
                {tocElement}
              </div>
            </ViewTransition>

            <Activity mode={showRecentPosts ? "visible" : "hidden"}>
              <ViewTransition name={transitionNames.recentPosts}>
                <SectionRecentPosts />
              </ViewTransition>
            </Activity>
          </div>
        </div>
      </aside>
    </div>
  );
};
