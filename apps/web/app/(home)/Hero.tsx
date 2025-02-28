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
        padding: 16px;
        background: var(--color-bg-card);
        border-radius: 8px;

        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;

        ${mediaPc} {
          margin-block-start: 32px;

          padding: 32px;

          grid-template-columns: 320px 1fr;
          gap: 32px;
        }
      `}
    >
      <div
        css={`
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;

          ${mediaPc} {
            place-self: center end;
            padding-block-end: 64px;
            text-align: end;
            place-items: end center;
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
            gap: 0.5rem;
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
