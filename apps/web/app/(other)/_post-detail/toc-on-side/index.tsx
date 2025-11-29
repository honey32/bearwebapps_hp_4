import { type FC } from "react";

import { tocParser } from "@repo/post/toc-parser";

import { Portal } from "./_portal";
import { TocOnSideContent } from "./_content";

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

export const TocOnSide: FC<Props> = async ({ content }) => {
  const toc = await tocParser.process(content);
  const headings = toc.data.headings as HeadingData[];

  if (headings.length === 0) return null;

  return (
    <Portal htmlFor="portal_toc_on_side">
      <TocOnSideContent data={headings} />
    </Portal>
  );
};
