"use client";

import Image from "next/image";
import styles from "./PostFooterImage.module.scss";
import { microCmsImageLoader } from "@/app/_repositories/posts/microCmsImageLoader";

type Props = {
  src?: string;
};

export function PostFooterImage({ src }: Props) {
  if (!src) return undefined;

  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        alt=""
        loader={microCmsImageLoader}
        fill
        sizes="(min-width: 960px) 800px, 100vw"
        className={styles.nextImage}
      />
    </div>
  );
}
