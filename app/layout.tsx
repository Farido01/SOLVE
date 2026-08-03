import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOLVE — Стиль. Качество. Минимализм.',
  description: 'SOLVE — премиум интернет-магазин одежды, кроссовок, аксессуаров и сумок.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#E8E8E4] text-[#0D0E10] antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
