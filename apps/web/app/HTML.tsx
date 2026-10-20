"use client";

import type { ComponentPropsWithoutRef, FC } from "react";

import { useAtomValue } from "jotai";

import { colorModeAtom } from "@/app/_colorMode/colorModeAtom";

type Props = ComponentPropsWithoutRef<"html">;

export const HTML: FC<Props> = ({ children, ...props }) => {
  const theme = useAtomValue(colorModeAtom);

  return (
    <html {...props} data-theme={theme}>
      {children}
    </html>
  );
};
