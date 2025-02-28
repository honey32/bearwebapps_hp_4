const css = String.raw;

export const resetCss = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
  }

  body {
    color: var(--color-text);
    background-color: var(--color-bg-back);
  }

  a:not(:hover) {
    text-decoration: none;
  }

  a:any-link {
    color: var(--color-text-link);

    &:where(:hover) {
      color: var(--color-text-link-hover);
    }
  }
`;
