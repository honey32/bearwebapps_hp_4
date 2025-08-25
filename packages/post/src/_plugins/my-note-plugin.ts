import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { Root } from "mdast";

export const myNotePlugin = (() => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (node.name !== "note") return;

        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = {
          className: "callout_note",
        };
      }
    });
  };
}) satisfies Plugin<unknown[], Root>;
