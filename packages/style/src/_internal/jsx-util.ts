import { processStyle } from "#_internal/process-style.ts";
import { clsx } from "clsx";
import { createElement, Fragment, ReactNode } from "react";

const hasCssProp = (props: unknown): props is { css: string } => {
  return !!props && typeof props === "object" && "css" in props;
};

const withClassnameConcat = (
  props: NonNullable<Record<string, unknown>>,
  className: string,
): typeof props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { css, ...rest } = props;
  return { ...rest, className: clsx(className, rest.className as string) };
};

export const processCssForJsx = (
  props: unknown,
): { styleElem: ReactNode; props: unknown } | undefined => {
  if (hasCssProp(props)) {
    const { className, styleElem: _style, hash } = processStyle(props.css);
    const styleElem = createElement(Fragment, { key: `style-${hash}` }, _style);
    return { styleElem, props: withClassnameConcat(props, className) };
  }
  return undefined;
};
