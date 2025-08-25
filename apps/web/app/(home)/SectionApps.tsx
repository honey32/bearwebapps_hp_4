import { ReactNode } from "react";

import { ExternalLink } from "tabler-icons-react";

import { HeadingLevel } from "../_heading/heading-level";

import {
  SectionCardBase,
  SectionHeading,
  SectionHeadingWrapper,
  SectionPostDescription,
  SectionPostTitle,
} from "./_section-base";

type ApplicationInfo = {
  id: string;
  title: string;
  url: string;
  description: ReactNode;
};

const apps: ApplicationInfo[] = [
  {
    id: "notestand",
    title: "Notestand",
    url: "https://notestand.bearwapps.com/index-ja.html",
    description: (
      <p>
        Googleドライブを利用するPDF楽譜ビューワー。正しくあいうえお順に楽譜を並べる機能も搭載。PDFの楽譜ファイルを快適に管理・閲覧できます。
      </p>
    ),
  },
  {
    id: "tetris",
    title: "Honey Tetris",
    url: "https://tetris.bearwapps.com/",
    description: <p>テトリスもどきです。</p>,
  },
];

const SectionArticleCard = SectionCardBase.as(HeadingLevel);

export default function SectionApps() {
  return (
    <HeadingLevel
      as="section"
      css={`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <SectionHeadingWrapper>
        <SectionHeading>作成したアプリ</SectionHeading>
      </SectionHeadingWrapper>

      {apps.map((app) => (
        <SectionArticleCard as="article" key={app.id}>
          <SectionPostTitle>
            <a href={app.url}>
              {app.title}
              <ExternalLink size={18} />
            </a>
          </SectionPostTitle>

          <SectionPostDescription>{app.description}</SectionPostDescription>
        </SectionArticleCard>
      ))}
    </HeadingLevel>
  );
}
