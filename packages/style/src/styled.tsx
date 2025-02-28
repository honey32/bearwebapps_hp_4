import {
  createElement,
  Fragment,
  type ComponentPropsWithRef,
  type ElementType,
  type FC,
} from "react";
import { clsx } from "clsx";

import { processStyle } from "#_internal/process-style.ts";

type TemplateFn<C> = (...templateArgs: Parameters<typeof String.raw>) => C;

export const styled = <C extends ElementType>(
  base: C,
): TemplateFn<FC<ComponentPropsWithRef<C>>> => {
  return (...templateArgs) => {
    const { className, styleElem } = processStyle(String.raw(...templateArgs));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const StyledComponent: FC<any> = (props) => {
      const Comp = base as FC<unknown & { className?: string }>;
      return createElement(
        Fragment,
        {},
        styleElem,
        createElement(Comp, {
          ...props,
          className: clsx(className, props.className),
        }),
      );
    };
    const baseName =
      typeof base === "string" ? base : base.displayName || base.name;
    StyledComponent.displayName = `Styled_${baseName}`;
    return StyledComponent as FC<ComponentPropsWithRef<C>>;
  };
};

export const willBeStyled = (
  fn: (ctx: { css: TemplateFn<string> }) => string,
): {
  as: <C extends ElementType>(base: C) => FC<ComponentPropsWithRef<C>>;
} => {
  const cssString = fn({ css: String.raw });
  return {
    as: (base) => styled(base)`
      ${cssString}
    `,
  };
};
