import { markdownTocParser } from "../_md/markdownTocParser";

import TocOnSide from "./TocOnSide";

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

export default async function TocOnSideContainer({ content }: Props) {
  const toc = await markdownTocParser.process(content);

  const headings = toc.data.headings as HeadingData[];

  if (headings.length === 0) return null;

  return <TocOnSide data={headings} />;
}
