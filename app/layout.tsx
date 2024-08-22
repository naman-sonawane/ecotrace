import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: '${inter.style.fontFamily}', sans-serif;
          }
        `}</style>
      </head>
      <body>
        <main>
          {children}</main>
      </body>
    </html>
  );
}
