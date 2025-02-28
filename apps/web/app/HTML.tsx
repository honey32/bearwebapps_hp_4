"use client";

import { useAtomValue } from "jotai";
import { colorModeAtom } from "@/app/_colorMode/colorModeAtom";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"html">;

export default function HTML({ children, ...props }: Props) {
  const theme = useAtomValue(colorModeAtom);

  return (
    <html {...props} data-theme={theme}>
      {children}
    </html>
  );
}
