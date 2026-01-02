type ISODatetimeString = string;

type Post = {
  id: string;
  createdAt: ISODatetimeString;
  updatedAt: ISODatetimeString;
  publishedAt: ISODatetimeString;
  title: string;
  content: string;
  exerpt: string;
  tags: { name: string }[];
};

export const microCmsContentsMock: Post[] = [
  {
    id: "markdown-and-syntax-highlight",
    createdAt: "2023-03-22T11:11:00",
    updatedAt: "2023-03-22T11:11:00",
    publishedAt: "2023-03-22T11:11:00",
    title:
      "マークダウンと syntax highlight のテスト、長いタイトルでキレイに改行できるか",
    tags: [{ name: "Hoge" }],
    content: `
## レベル2の見出し_1はめちゃくちゃ長大でうまく改行できるか確認する {#heading-1}

素早い茶色の狐がのろまな犬を飛び越す
素早い茶色の狐がのろまな犬を飛び越す
素早い茶色の狐がのろまな犬を飛び越す
素早い茶色の狐がのろまな犬を飛び越す
素早い茶色の狐がのろまな犬を飛び越す  
スペース二個で改行される

:::note
Note 記法
:::

> ブロック引用

空行が入ると段落が分けられる

## レベル2の見出し_2 {#heading-2}

本文コンテンツ \`inline code\` はどうなるか \`inline に日本語が含まれるとどうなるか\` を
テスト。スタイルが崩れないことを確認するために長めの文章になっている。  
テストテスト

*強調斜体* **強調太字**

### レベル3の見出し {#heading-2-1}

- 番号なしリスト
- 番号なしリスト

1. 番号付きリスト
1. 番号付きリスト
1. 番号付きリスト


~~~diff-tsx {13}
  // src/a/aa.tsx
  const a: ReactNode = (
    <div
-     id="xabcd"
      className={clsx(styles.aaa, font.className)}
-     onClick={() => console.log("aaa")}
    >
-     abcd
+     A Button
    </div>
  )

  const b = null + undefined + 10

  const backtickStr = \`aaa\${a + b + 10}ccc\`
~~~

コードサンプルその2

~~~tsx
// src/s.tsx
const s = "aaa";
~~~

### レベル3の見出し、その2 {#heading-2-2}

ああああ

## ああああ {#heading-3}

ああああいいうう
    `,
    exerpt:
      "ここに記事の概要のイクサープトが入ります。2 行以上で省略、auto-phrase のお陰で適当なところで改行してくれます。",
  },
  {
    id: "empty-empty",
    createdAt: "2023-03-22T11:11:00",
    updatedAt: "2023-03-22T11:11:00",
    publishedAt: "2023-03-22T11:11:00",
    title: "中身のない記事テストその2",
    tags: [{ name: "Hoge" }],
    content: ``,
    exerpt: "短い説明",
  },
  {
    id: "empty-2",
    createdAt: "2023-03-22T11:11:00",
    updatedAt: "2023-03-22T11:11:00",
    publishedAt: "2023-03-22T11:11:00",
    title: "中身のない記事テストその1",
    tags: [{ name: "Hoge" }],
    content: ``,
    exerpt: "短い説明",
  },
];
