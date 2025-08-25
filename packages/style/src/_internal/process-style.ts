import { createElement } from "react";

import { hash } from "#_internal/hash.ts";

export const processStyle = (str: string) => {
  const content = str;
  const _hash = hash(content);
  const className = `st-${_hash}`;

  const styleElem = createElement(
    "style",
    { href: _hash, precedence: "component" },
    `.${className} {${str}}`,
  );

  return {
    className,
    styleElem,
    content,
    hash: _hash,
  };
};
