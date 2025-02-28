import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkHeadingId from "remark-heading-id";
import { unified } from "unified";

import remarkHeadings from "@vcarl/remark-headings";

export const markdownTocParser = unified()
  .use(remarkParse)
  .use(remarkHeadingId)
  .use(remarkStringify)
  .use(remarkHeadings);
