import { ImageLoader } from "next/image";

// microcms は imgix を使っているので、対応するパラメータを使う
export const microCmsImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  const params = url.searchParams;
  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());
  params.set("q", (quality || 50).toString());
  params.set("fm", "webp"); // webp を利用する
  return url.href;
};
