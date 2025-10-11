"use client";

//@ts-expect-error ViewTransition is not defined
import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";

import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";

import styles from "./PostEyecatch.module.scss";

type Props = {
  src?: string;
  id: string;
};

export function PostEyecatch({ src, id }: Props) {
  if (!src) return undefined;
  return (
    <div className={styles.wrapper}>
      <ViewTransition name={`post-thumbnail-${id}`}>
        <Image
          src={src}
          alt=""
          loader={microCmsImageLoader}
          fill
          sizes="(min-width: 960px) 800px, 100vw"
          className={styles.nextImage}
          priority
        />
      </ViewTransition>
    </div>
  );
}
