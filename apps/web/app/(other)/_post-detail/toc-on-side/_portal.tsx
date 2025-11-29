"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore, type FC, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlFor: string;
};

export const Portal: FC<Props> = ({ children, htmlFor }) => {
  const el = useSyncExternalStore(
    () => () => {},
    () => document.getElementById(htmlFor),
    () => null,
  );

  if (!el) return null;

  return createPortal(children, el);
};
