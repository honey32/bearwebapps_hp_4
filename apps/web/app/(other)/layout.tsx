import { GlobalHeader } from "./_global-header";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <GlobalHeader />
      {children}
    </>
  );
}
