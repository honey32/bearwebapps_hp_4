"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import styles from "./TocOnSide.module.scss";

type Props = {
  data: HeadingData[];
};

type HeadingData = {
  depth: number;
  value: string;
  data?: {
    id?: string;
  };
};

function TocOnSide_Impl({ data }: Props) {
  // スクロールに応じて現在読んでいる章を取得する
  const [currentItem, setCurrentItem] = useState<string>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setCurrentItem(e.target.id);
        }
      },
      { rootMargin: "-20% 0% -60%" },
    );

    const targets = Array.from(document.querySelectorAll("h2,h3"));
    targets.forEach((target) => target.id && observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={styles.root}>
      <div className={styles.title}>この記事のコンテンツ</div>

      <ul className={styles.ul}>
        {data.map((heading) => {
          const id = heading?.data?.id;
          const key = `${heading.value} ${id ?? ""}`;

          return (
            <li
              key={key}
              className={styles.item}
              data-depth={heading.depth}
              aria-current={currentItem === id ? "true" : "false"}
            >
              <span className={styles.bullet} />
              {id ? (
                <a href={`#${id}`}>{heading.value}</a>
              ) : (
                <span>{heading.value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function TocOnSide(props: Props) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById("portal_toc_on_side"));
  }, []);

  if (!el) return null;

  return createPortal(<TocOnSide_Impl {...props} />, el);
}
