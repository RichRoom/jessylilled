import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jessylilled - Populaarsed Lilled | Lillepood',
  description: 'Telli kauneid lilleseadeid igaks puhuks. Värskeid lilli, hoolikalt valitud ja armastusega valmistatud.',
  keywords: 'lilled, lillekimbud, pulmad, lillepood, lillede kohaletoimetamine, Jessylilled, Eesti',
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
          async 
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP3z24jYgZ3LiQqTpTkSiLVFjZc5lqIdg&callback=console.debug&libraries=maps,marker&v=beta"
        ></script>
        <script 
          src="https://widgets.sociablekit.com/google-reviews/widget.js" 
          defer
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}