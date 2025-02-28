import type { Parent, Literal } from "mdast";

// app\(other)\posts\[slug]\_md\myNotePlugin.ts がうまくいかないので、ここで型を定義する。

declare module "mdast" {
  interface BlockContentMap {
    // Allow using math nodes defined by `remark-math`.
    textDirective: TextDirective;
    leafDirective: LeafDirective;
    containerDirective: ContainerDirective;
  }

  interface TextDirective extends Parent {
    type: "textDirective";
    name: string;
    attributes: Record<string, string>;
  }

  interface LeafDirective extends Literal {
    type: "leafDirective";
    name: string;
    attributes: Record<string, string>;
  }

  interface ContainerDirective extends Parent {
    type: "containerDirective";
    name: string;
    attributes: Record<string, string>;
  }
}
