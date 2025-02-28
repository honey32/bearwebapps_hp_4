"use client";

import { useAtom } from "jotai";
import { ArrowsRightLeft, Moon, Sun } from "tabler-icons-react";

import { styled } from "@repo/style/styled";
import { ToggleGroupItem, ToggleGroupRoot } from "@repo/ui/toggle-group";

import { colorModeAtom } from "./colorModeAtom";

export default function ColorModeSwitch() {
  const [colorMode, setColorMode] = useAtom(colorModeAtom);

  const messages = {
    light: "ライト",
    neutral: "システム",
    dark: "ダーク",
  } satisfies Record<typeof colorMode, string>;

  const toggleSwitchMessage = (to: typeof colorMode) => {
    return `${messages[to]}に切り替え`;
  };

  return (
    <Root>
      <ToggleGroupRoot
        type="single"
        value={colorMode}
        onValueChange={(
          value: string, // ToggleGroup.Root に型がつかないので応急処置
        ) => setColorMode((value || "neutral") as typeof colorMode)}
      >
        <ToggleGroupItem
          value="dark" //
          aria-label={toggleSwitchMessage("dark")}
        >
          <Moon />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="neutral"
          aria-label={toggleSwitchMessage("neutral")}
        >
          <ArrowsRightLeft />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="light"
          aria-label={toggleSwitchMessage("neutral")}
        >
          <Sun />
        </ToggleGroupItem>
      </ToggleGroupRoot>

      <div>{"カラーモード: " + messages[colorMode]}</div>
    </Root>
  );
}

const Root = styled("div")`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
