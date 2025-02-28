import GlobalHeader from "./GlobalHeader";

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
