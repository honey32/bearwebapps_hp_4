import { FC } from "react";
import Image from "next/image";

import { myProfile } from "@/app/_my_profile/myProfile";
import { font_poppins } from "@/app/_common/fonts";

export const ProfileCard: FC = () => {
  return (
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
  );
};
