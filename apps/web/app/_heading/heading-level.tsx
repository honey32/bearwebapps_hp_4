"use client";

import { use, Fragment, ComponentPropsWithRef } from "react";
import { HeadingLevelContext } from "./context";

type ElementName = "section" | "article" | "aside" | "nav" | typeof Fragment;

type Props<T extends ElementName> = {
  as: T;
  css?: string;
} & ComponentPropsWithRef<T>;

export const HeadingLevel = <T extends ElementName>({
  as,
  ref,
  ...props
}: Props<T>) => {
  const Comp = as as ElementName;
  const parentLevel = use(HeadingLevelContext);
  return (
    <HeadingLevelContext value={parentLevel + 1}>
      <Comp
        {...props}
        //@ts-ignore ref の型不一致は無視する
        ref={ref}
      />
    </HeadingLevelContext>
  );
};
