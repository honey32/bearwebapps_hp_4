const css = String.raw;

export const colorSchemes = {
  light: css`
    --color-text: oklch(from green 0.3 0.05 h);
    --color-text-secondary: oklch(from green 0.5 0.005 h);
    --color-text-link: blue;
    --color-text-link-hover: oklch(from blue 0.8 c h);

    --color-text-accent: oklch(from green 0.4 0.5 h);
    --color-text-accent-adornment: oklch(from green 0.8 0.1 h);
    --color-text-semi-accent: oklch(from green 0.45 0.6 h);

    --color-bg-dark: oklch(from blue 0.2 0.02 h);
    --color-bg: oklch(from white 0.995 0 h);
    --color-bg-back: oklch(from yellow 0.95 0 h);
    --color-bg-codeblock: oklch(from blue 0.25 0.02 h);
    --color-bg-card: var(--color-bg);

    --color-accent: oklch(from green 0.93 0.05 h);
    --color-accent-border: var(--color-accent);
    --color-accent-fore: oklch(from green 0.2 1 h);

    --color-accent2: oklch(from yellow 0.93 0.2 h);
    --color-accent2-weak: oklch(from yellow 0.99 0.05 h);
    --color-accent2-fore: oklch(from yellow 0.3 0.1 h);

    --color-bg-modal: oklch(from var(--color-bg) l c h / 0.7);

    --color-border: oklch(from green 0.8 0.02 h);
  `,

  dark: css`
    --color-text: oklch(from yellow 0.8 0.01 h);
    --color-text-secondary: oklch(from yellow 0.8 0.01 h / 0.7);
    --color-text-link: oklch(from blue 0.9 c h);
    --color-text-link-hover: oklch(from blue 0.95 calc(c - 0.1) h);
    --color-text-accent: oklch(from gold 0.8 0.1 h);
    --color-text-accent-adornment: oklch(from gold 0.5 0.05 h);
    --color-text-semi-accent: oklch(from gold 0.8 0.1 h);

    --color-bg: var(--color-bg-dark);
    --color-bg-back: var(--color-bg-dark);
    --color-bg-codeblock: var(--color-bg-dark);
    --color-bg-card: oklch(from var(--color-bg) 0.25 0.01 h);

    --color-accent: oklch(from green 0.3 0.1 h);
    --color-accent-border: oklch(from green 0.7 0.1 h);
    --color-accent-fore: oklch(from green 0.9 0.1 h);

    --color-accent2: oklch(from white 0.6 c h);
    --color-accent2-weak: var(--color-bg-card);
    --color-accent2-fore: oklch(from yellow 0.8 0.01 h);

    --color-bg-modal: oklch(from var(--color-bg) 0.25 0.01 h / 0.75);

    --color-border: oklch(from var(--color-bg) 0.6 0.01 h);
  `,
};
