"use client";

import { type FC } from "react";
import Image from "next/image";

import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";

type Props = {
  src?: string;
};

export const PostFooterImage: FC<Props> = ({ src }) => {
  if (!src) return undefined;

  return (
    <div
      css={`
        @keyframes appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }
        height: min(240px, 40vw);
        overflow: hidden;
        position: relative;
        opacity: 0.5;
        animation: appear 2s ease-in-out;
        &::after {
          position: absolute;
          display: block;
          content: "";
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            170deg,
            var(--color-bg) 0,
            var(--color-bg) 25%,
            transparent 80%
          );
        }
      `}
    >
      <Image
        src={src}
        alt=""
        loader={microCmsImageLoader}
        fill
        sizes="(min-width: 960px) 800px, 100vw"
        css={`
          height: min(320px, 40vw);
          object-fit: cover;
          object-position: center;
          opacity: 0.1;
          filter: saturate(0.5);
        `}
      />
    </div>
  );
};
