import Image from "next/image";

import { styled } from "@repo/style/styled";
import { myProfile } from "@/app/_my_profile/myProfile";
import { font_poppins } from "@/app/_common/fonts";

const css = String.raw;

const mediaPc = "@media screen and (min-width: 960px)";

const container = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`;

const AvaterImage = styled(Image)`
  border-radius: 100%;
  display: block;
`;

const A = styled("a")`
  font-weight: 200;
  font-size: 1.1rem;
  text-decoration: underline;
`;

export default function Hero() {
  return (
    <section
      css={`
        ${container}
        background: var(--color-bg-card);
        border-radius: 8px;

        display: grid;
        grid-template-columns: 1fr;
        gap: 0px;
        row-rule: 1px solid oklch(from var(--color-border) l c h / 0.5);

        ${mediaPc} {
          margin-block-start: 32px;

          grid-template-columns: 378px 1fr;
          column-rule: 1px solid oklch(from var(--color-border) l c h / 0.5);
          column-rule-inset: 24px;
        }
      `}
    >
      <div
        css={`
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          padding: 16px;

          ${mediaPc} {
            place-self: center end;
            padding-block-end: 64px;
            text-align: end;
            place-items: end center;
            padding: 32px;
          }
        `}
      >
        <AvaterImage src="/Honeycomb_2.png" width={60} height={60} alt="" />

        <h1
          className={font_poppins.className}
          css={`
            font-size: 2.5rem;
            font-weight: 200;
          `}
        >
          Honey 32
        </h1>
        <div
          className={font_poppins.className}
          css={`
            display: flex;
            column-gap: 1rem;
            flex-wrap: wrap;
            column-rule: 2px solid oklch(from var(--color-border) l c h);
            column-rule-inset: 8px;

            ${mediaPc} {
              justify-content: end;
            }
          `}
        >
          <A href="https://github.com/honey32" target="_blank">
            GitHub
          </A>
          <A href="https://twitter.com/honey321998" target="_blank">
            Twitter
          </A>
          <A href="https://qiita.com/honey32" target="_blank">
            Qiita
          </A>
          <A href="https://zenn.dev/honey32" target="_blank">
            Zenn
          </A>
          <A href="https://scrapbox.io/honey32/" target="_blank">
            Scrapbox
          </A>
        </div>
      </div>

      <section
        css={`
          padding: 16px;
          margin-block: -0.5rem;

          ${mediaPc} {
            padding: 32px;
          }

          p,
          ul {
            line-height: 1.5;
            margin-block: 0.5rem;
          }

          ul {
            margin-inline-start: 1.5em;
          }

          h3 {
            color: var(--color-text-accent);
          }
        `}
      >
        {myProfile}
      </section>
    </section>
  );
}
