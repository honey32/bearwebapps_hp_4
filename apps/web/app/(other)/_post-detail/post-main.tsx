import { styled } from "@repo/style/styled";

export const PostMain = styled("main")`
  background-color: var(--color-bg);
  contain: content;
  --margin-h: 16px;
  margin-block-start: 32px;
  border-radius: 16px;
  @media screen and (min-width: 960px) {
    margin-inline: 32px;
    border-radius: 8px;
    --margin-h: 32px;
  }
`;
