import * as prod from "react/jsx-runtime";
import remarkParse from "remark-parse";
import remarkHeadingId from "remark-heading-id";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import rehypePrismAll from "rehype-prism-plus";
import remarkDirective from "remark-directive";

import { myNotePlugin } from "./myNotePlugin";

import "../prism.scss";

export const markdownBodyParser = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(myNotePlugin)
  .use(remarkHeadingId)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypePrismAll, { ignoreMissing: true, showLineNumbers: true })
  .use(rehypeReact, {
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    Fragment: prod.Fragment,
  });
