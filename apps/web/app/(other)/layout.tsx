import { GlobalHeader } from "./_global-header";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <GlobalHeader />
      {children}
    </>
  );
}
