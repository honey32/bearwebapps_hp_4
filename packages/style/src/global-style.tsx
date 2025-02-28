import { processStyle } from "#_internal/process-style.ts";
import { useMemo, type FC } from "react";

type Props = {
  children?: string;
};

export const GlobalStyle: FC<Props> = ({ children }) => {
  const styleElem = useMemo(() => {
    if (!children) return null;
    const { hash, content } = processStyle(children);
    return (
      <style href={hash} precedence="global">
        {content}
      </style>
    );
  }, [children]);

  return styleElem;
};
