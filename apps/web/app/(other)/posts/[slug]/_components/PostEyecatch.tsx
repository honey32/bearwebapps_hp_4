"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import styles from "./PostEyecatch.module.scss";
import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";

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
