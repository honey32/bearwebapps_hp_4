import ReactJSXRuntime from "react/jsx-runtime";

import { processCssForJsx } from "#_internal/jsx-util.ts";

export const Fragment = ReactJSXRuntime.Fragment;

export type { StyleJSX as JSX } from "#_internal/jsx-types.ts";

export const jsx: typeof ReactJSXRuntime.jsx = (type, props, key) => {
  const s = processCssForJsx(props);
  if (s) {
    const { props, styleElem } = s;
    return ReactJSXRuntime.jsxs(
      Fragment,
      { children: [styleElem, ReactJSXRuntime.jsx(type, props, key)] },
      key,
    );
  }

  return ReactJSXRuntime.jsx(type, props, key);
};

export const jsxs: typeof ReactJSXRuntime.jsxs = (type, props, key) => {
  const s = processCssForJsx(props);
  if (s) {
    const { props, styleElem } = s;
    return ReactJSXRuntime.jsxs(
      Fragment,
      { children: [styleElem, ReactJSXRuntime.jsxs(type, props, key)] },
      key,
    );
  }

  return ReactJSXRuntime.jsxs(type, props, key);
};
