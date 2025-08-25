"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  children: ReactNode | null;
  nonNull?: boolean;
};

export default function Layout_InvisibleOnRoot({ children }: Props) {
  const seg = useSelectedLayoutSegment();

  if (seg) return children;

  return null;
}
