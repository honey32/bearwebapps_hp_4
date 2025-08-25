"use client";

import type { ComponentPropsWithoutRef } from "react";

import { useAtomValue } from "jotai";

import { colorModeAtom } from "@/app/_colorMode/colorModeAtom";

type Props = ComponentPropsWithoutRef<"html">;

export default function HTML({ children, ...props }: Props) {
  const theme = useAtomValue(colorModeAtom);

  return (
    <html {...props} data-theme={theme}>
      {children}
    </html>
  );
}
