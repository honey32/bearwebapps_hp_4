import { ToggleGroup } from "radix-ui";

import { styled } from "@repo/style/styled";

export const ToggleGroupRoot = styled(ToggleGroup.Root)`
  display: inline-flex;
  border: 2px solid var(--color-border);
  border-radius: 24px;

  padding: 4px 6px;
  gap: 4px;

  & > :where(button) {
    all: unset;
    padding: 4px;
    line-height: 1;

    &[data-state="on"] {
      border-radius: 16px;

      color: var(--color-bg);
      background-color: var(--color-text);
    }
  }
`;

export const ToggleGroupItem = ToggleGroup.Item;
