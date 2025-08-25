import * as prod from "react/jsx-runtime";

import { unified } from "unified";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import remarkHeadingId from "remark-heading-id";
import remarkDirective from "remark-directive";
import rehypeReact from "rehype-react";
import rehypeRaw from "rehype-raw";
import rehypePrismAll from "rehype-prism-plus";

import { myNotePlugin } from "#src/_plugins/my-note-plugin.ts";

export const bodyParser = unified()
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
