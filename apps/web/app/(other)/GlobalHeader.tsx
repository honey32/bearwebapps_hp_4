"use client";

import clsx from "clsx";
import { font_poppins } from "@/app/_common/fonts";
import styles from "./GlobalHeader.module.scss";
import { useScrollYDirection } from "./useScrollingYDirection";

type Props = {};

export default function GlobalHeader({}: Props) {
  const scrollDirection = useScrollYDirection();

  return (
    <header
      className={clsx(styles.root, font_poppins.className)}
      data-scroll-direction={scrollDirection}
    >
      <div className={styles.contents}>
        <h1 className={styles.title}>
          <a href="/">Honey32 Bear Web Apps</a>
        </h1>
        <div className={styles.links}>
          <a href="https://github.com/honey32" target="_blank">
            GitHub
          </a>
          <a href="https://twitter.com/honey321998" target="_blank">
            Twitter
          </a>
          <a href="https://qiita.com/honey32" target="_blank">
            Qiita
          </a>
          <a href="https://zenn.dev/honey32" target="_blank">
            Zenn
          </a>
          <a href="https://scrapbox.io/honey32/" target="_blank">
            Scrapbox
          </a>
        </div>
      </div>
    </header>
  );
}
