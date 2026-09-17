import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://endstation-alter-bahnhof.nxco-nbg.chatgpt.site'),
  title: 'Endstation Alter Bahnhof | Shisha Lounge Mühlhausen',
  description: 'Shisha-Kultur, ausgewählte Tabaksorten, Drinks und urbane Nächte im Alten Bahnhof Mühlhausen.',
  icons: { icon: '/gorilla-logo.png' },
  openGraph: {
    title: 'Endstation Alter Bahnhof',
    description: 'Shisha · Drinks · Culture im Alten Bahnhof Mühlhausen.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endstation Alter Bahnhof',
    description: 'Shisha · Drinks · Culture im Alten Bahnhof Mühlhausen.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
