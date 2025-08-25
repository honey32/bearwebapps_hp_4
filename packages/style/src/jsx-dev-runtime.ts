import ReactJSXRuntimeDev from "react/jsx-dev-runtime";

import { processCssForJsx } from "#_internal/jsx-util.ts";

export const Fragment = ReactJSXRuntimeDev.Fragment;

export const jsxDEV: typeof ReactJSXRuntimeDev.jsxDEV = (
  type,
  props,
  key,
  isStaticChildren,
  source,
  self,
) => {
  const s = processCssForJsx(props);
  if (s) {
    const { props, styleElem } = s;
    const element = ReactJSXRuntimeDev.jsxDEV(
      type,
      props,
      undefined,
      isStaticChildren,
      source,
      self,
    );

    return ReactJSXRuntimeDev.jsxDEV(
      Fragment,
      { children: [styleElem, element] },
      key,
      true, // isStaticChildren
      source,
      self,
    );
  }

  return ReactJSXRuntimeDev.jsxDEV(
    type,
    props,
    key,
    isStaticChildren,
    source,
    self,
  );
};
