import Link from "next/link";

import { styled, willBeStyled } from "@repo/style/styled";

import { Heading } from "../_heading/heading";

export const SectionCardBase = willBeStyled(
  ({ css }) => css`
    background-color: var(--color-bg-card);
    border-radius: 8px;
    padding: 8px 8px 12px;
  `,
);

export const SectionHeadingWrapper = styled("header")`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
`;

export const SectionHeading = styled(Heading)`
  font-weight: normal;
  color: var(--color-text-accent);
`;

export const SectionPostTitle = styled(Heading)`
  text-wrap: pretty;
  word-break: auto-phrase;

  line-height: 1.3;
  font-feature-settings: "palt", "kern";
  letter-spacing: 0.01em;

  & > a {
    color: inherit;

    & > svg {
      margin-left: 0.25rem;
      color: var(--color-text-secondary);
    }
  }
`;

export const SectionPostDescription = styled("div")`
  text-wrap: pretty;
  word-break: auto-phrase;

  line-height: 1.5;
  font-size: 0.9rem;
  color: var(--color-text-secondary);

  p {
    margin-top: 0.4em;
  }
`;

export const SectionHeadingMore = styled(Link)`
  align-self: center;
  display: block;
  text-decoration: underline;
`;

export const SectionPostNumbers = styled("div")`
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);

  display: flex;
  gap: 0.5em;

  & > span {
    display: inline-flex;

    svg {
      align-self: center;
      margin-inline-end: 0.1em;
    }
  }
`;
