"use client";

import { type FC } from "react";
import { ViewTransition } from "react";
import Image from "next/image";

import { microCmsImageLoader } from "@/app/_http/microcms/image-loader";

type Props = {
  src?: string;
  id: string;
};

export const PostEyecatch: FC<Props> = ({ src, id }) => {
  if (!src) return undefined;
  return (
    <div
      css={`
        @keyframes parallax {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          10% {
            opacity: 1;
          }
          30% {
            opacity: 0;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        z-index: -1;
        height: min(480px, 60vw);
        overflow: hidden;
        position: relative;
        animation: parallax linear;
        animation-duration: 1ms;
        animation-timeline: scroll();
        margin-block-end: -64px;
        @media screen and (min-width: 960px) {
          margin-block-end: -160px;
        }
      `}
    >
      <ViewTransition name={`post-thumbnail-${id}`}>
        <Image
          src={src}
          alt=""
          loader={microCmsImageLoader}
          fill
          sizes="(min-width: 960px) 800px, 100vw"
          css={`
            object-fit: cover;
            object-position: 50% 100%;
            filter: contrast(calc(1 + var(--faded-contrast-factor) * 0.5))
              brightness(calc(1 + var(--faded-brightness-factor) * 0.5));
          `}
          priority
        />
      </ViewTransition>
    </div>
  );
};
