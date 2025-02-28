import { Noto_Sans_JP, Poppins } from "next/font/google";

export const font_noto_sans_jp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const font_poppins = Poppins({ weight: ["200"], subsets: ["latin"] });
