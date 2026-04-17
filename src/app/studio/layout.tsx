export const metadata = {
  title: "서경엔지니어링 CMS",
  robots: "noindex, nofollow",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
