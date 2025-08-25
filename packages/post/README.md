# @repo/post

Markdown を使った、記事パーサーとTOC生成機能を提供するパッケージです。

## 機能

- `body-parser`: マークダウンコンテンツをReactコンポーネントに変換
- `toc-parser`: マークダウンから目次（TOC）を生成
- `styles/prism.scss`: コードハイライト用のスタイル

## 使用方法

```typescript
import { bodyParser } from "@repo/post/body-parser";
import { tocParser } from "@repo/post/toc-parser";
import "@repo/post/styles/prism.scss";

// マークダウンコンテンツをReactコンポーネントに変換
const parsedContent = await bodyParser.process(markdownContent);

// 目次を生成
const toc = await tocParser.process(markdownContent);
const headings = toc.data.headings;
```
