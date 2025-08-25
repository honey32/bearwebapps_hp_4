"use client";

import { type ComponentPropsWithRef, type FC, use, useDebugValue } from "react";

import { HeadingLevelContext } from "./context";

const levelToTag = [null, "h1", "h2", "h3", "h4", "h5", "h6"] as const;

type Props = ComponentPropsWithRef<"h1">;

export const Heading: FC<Props> = (props) => {
  const level = use(HeadingLevelContext);
  useDebugValue(level);

  const Tag = levelToTag[level];

  if (!Tag) throw new Error("Heading level is invalid: " + level);

  return <Tag {...props} />;
};
