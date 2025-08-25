import { tocParser } from "@repo/post/toc-parser";

import styles from "./Toc.module.scss";

type Props = {
  content: string;
};

type HeadingData = {
  depth: number;
  value: string;
  data?: {
    id?: string;
  };
};

export default async function Toc({ content }: Props) {
  const toc = await tocParser.process(content);

  const headings = toc.data.headings as HeadingData[];

  if (headings.length === 0) return null;

  return (
    <nav className={styles.root}>
      <div className={styles.card}>
        <div className={styles.title}>この記事のコンテンツ</div>

        <ul className={styles.ul}>
          {headings.map((heading) => {
            const id = heading?.data?.id;
            const key = `${heading.value} ${id ?? ""}`;

            return (
              <li key={key} data-depth={heading.depth}>
                {id ? (
                  <a href={`#${id}`}>{heading.value}</a>
                ) : (
                  <span>{heading.value}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
