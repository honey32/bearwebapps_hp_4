import { atomWithStorage } from "jotai/utils";

type ColorMode = "neutral" | "light" | "dark";

export const colorModeAtom = atomWithStorage<ColorMode>("colorMode", "neutral");
