import "server-only";

import type { Metadata } from "next";

import { sharedOpenGraphMetadata } from "@/app/_common/shared-og-metadata";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";

import SectionZenn, { preload as preloadZennPosts } from "./SectionZenn";
import SectionRecentPosts, {
  preload as preloadRecentPosts,
} from "./SectionRecentPosts";
import SectionQiita, { preload as preloadQiitaPosts } from "./SectionQiita";
import SectionOSS from "./SectionOSS";
import SectionApps from "./SectionApps";
import Hero from "./Hero";

export const metadata: Metadata = {
  title: "ホーム",
  openGraph: {
    ...sharedOpenGraphMetadata,
    title: "ホーム",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  preloadRecentPosts();
  preloadQiitaPosts();
  preloadZennPosts();

  return (
    <main>
      <div
        css={`
          padding: 16px;
        `}
      >
        <Hero />
      </div>

      <div
        css={`
          padding: 16px;
          display: grid;
          grid-template-columns: 1fr max-content 1fr;
        `}
      >
        <div
          css={`
            grid-column: 2 / span 1;
          `}
        >
          <ColorModeSwitch />
        </div>
      </div>

      <div
        css={`
          padding: 16px 16px 64px;

          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(min(400px, 100%), 1fr)
          );
          gap: 32px;

          align-items: flex-start;

          max-width: 1200px;
          margin-inline: auto;
        `}
      >
        <SectionOSS />
        <SectionApps />
        <SectionRecentPosts />
        <SectionQiita />
        <SectionZenn />
      </div>
    </main>
  );
}
