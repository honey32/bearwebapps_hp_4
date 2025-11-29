const css = String.raw;
export const prismStyle = css`
  & .code-highlight {
    /* 行単位とハイライト等 */
    /* ref: https://github.com/timlrx/rehype-prism-plus#styling */
    float: left;
    /* 1 */
    min-width: 100%;
    /* 2 */

    --color-text-line-number: oklch(from white 0.5 c h);

    & .code-line {
      display: block;
      padding-left: 16px;
      padding-right: 16px;
      margin-left: -16px;
      margin-right: -16px;
      border-left: 4px solid rgba(0, 0, 0, 0);

      --c-color-text: var(--color-text-line-number);
      --c-color-text-emphasized: oklch(
        from var(--color-text-line-number) 0.9 c h
      );

      --c-color-bg: transparent;
      background-color: var(--c-color-bg);

      &.line-number::before {
        display: inline-block;
        width: 1rem;
        text-align: right;
        margin-right: 16px;
        margin-left: -8px;
        color: var(--c-color-text);
        content: attr(line);
      }

      &.deleted {
        --c-color-text: var(--c-color-text-emphasized);
        --c-color-bg: oklch(from red l c h / 0.2);
      }

      &.inserted {
        --c-color-text: var(--c-color-text-emphasized);
        --c-color-bg: oklch(from green l c h / 0.2);
      }

      &.highlight-line {
        --c-color-text: var(--c-color-text-emphasized);
        --c-color-bg: oklch(from cyan l c h / 0.1);
        border-color: cyan;
      }
    }

    /* ここから、トークンの色指定 */
    & .token.comment {
      color: oklch(from green 0.55 0.1 h);
    }

    & .token.string {
      color: oklch(from orange 0.7 0.25 h);
    }

    & .token.keyword {
      color: oklch(from violet 0.7 0.25 h);
    }

    & .token.number {
      color: oklch(from yellowgreen 0.8 0.25 h);
    }

    & .token.function {
      color: oklch(from yellow 0.85 0.25 h);
    }

    & .token.maybe-class-name {
      color: oklch(from green 0.75 0.25 h);
    }

    & .token.tag > *:not(.script) {
      color: oklch(from yellow 0.8 0.12 h);
    }
  }
`;
