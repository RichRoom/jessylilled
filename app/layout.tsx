import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jessylilled - Populaarsed Lilled | Lillepood',
  description: 'Telli kauneid lilleseadeid igaks puhuks. Värskeid lilli, hoolikalt valitud ja armastusega valmistatud.',
  keywords: 'lilled, lillekimbud, pulmad, lillepood, lillede kohaletoimetamine, Jessylilled, Eesti',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script 
          src="https://widgets.sociablekit.com/google-reviews/widget.js" 
          defer
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}