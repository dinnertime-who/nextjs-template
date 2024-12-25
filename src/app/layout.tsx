import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from '@/fonts';
import { MAIN_METADATA } from '@/config/seo';

export const metadata: Metadata = MAIN_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
