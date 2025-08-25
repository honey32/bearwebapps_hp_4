import { unified } from "unified";
import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import remarkHeadingId from "remark-heading-id";
import remarkHeadings from "@vcarl/remark-headings";

export const markdownTocParser = unified()
  .use(remarkParse)
  .use(remarkHeadingId)
  .use(remarkStringify)
  .use(remarkHeadings);
