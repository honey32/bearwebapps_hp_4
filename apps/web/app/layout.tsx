import { font_noto_sans_jp } from "./_common/fonts";
import { sharedOpenGraphMetadata } from "./_common/shared-og-metadata";
import { GlobalStyle } from "@repo/style/global-style";
import HTML from "./HTML";
import { colorSchemes } from "./style-color-scheme";
import { resetCss } from "./style-reset-css";

export const metadata = {
  title: { default: "Honey32", template: "%s | Honey32" },
  description: "Honey 32 bear web apps",
  openGraph: sharedOpenGraphMetadata,
};

const css = String.raw;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const globalStyle = css`
    :root {
      ${colorSchemes.light}
      @media (prefers-color-scheme: dark) {
        ${colorSchemes.dark}
      }
      &[data-theme="light"] {
        ${colorSchemes.light};
      }
      &[data-theme="dark"] {
        ${colorSchemes.dark};
      }
    }

    ${resetCss}

    html {
      scroll-behavior: smooth;
      scroll-padding-block-start: 120px;

      &[data-theme="dark"] {
        color-scheme: dark;
      }

      @media (prefers-color-scheme: dark) {
        color-scheme: dark;
      }
    }
  `;

  return (
    <HTML lang="ja">
      <GlobalStyle>{globalStyle}</GlobalStyle>
      <body className={font_noto_sans_jp.className}>{children}</body>
    </HTML>
  );
}
