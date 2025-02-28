import { ReactNode, Suspense } from "react";
import { myProfile } from "@/app/_my_profile/myProfile";
import styles from "./layout.module.scss";
import Layout_InvisibleOnRoot from "./Layout_InvisibleOnRoot";
import Image from "next/image";
import { font_poppins } from "@/app/_common/fonts";
import ColorModeSwitch from "@/app/_colorMode/ColorModeSwitch";
import SectionRecentPosts from "@/app/(home)/SectionRecentPosts";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      {/* 1 主要カラム */}
      <div className={styles.mainCol}>{children}</div>
      {/* 2 右サイドカラム */}
      <aside className={styles.rightCol}>
        <div className={styles.colorMode}>
          <ColorModeSwitch />
        </div>

        {/* 2-1 プロフィールカード */}
        <div className={styles.profileCard}>
          <div className={styles.avatarAndName}>
            <Image
              className={styles.avatar}
              src="/Honeycomb_2.png"
              width={60}
              height={60}
              alt=""
            />
            <h2 className={font_poppins.className}>Honey32</h2>
          </div>
          {myProfile}
        </div>

        <div className={styles.stick}>
          <div id="portal_toc_on_side" className={styles.toc} />

          {/* 2-2 最新の投稿 */}
          <Layout_InvisibleOnRoot>
            <Suspense>
              <SectionRecentPosts />
            </Suspense>
          </Layout_InvisibleOnRoot>
        </div>
      </aside>
    </div>
  );
}
