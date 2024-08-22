import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ 
  weight: '400',
  subsets: ['latin']
});

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
            font-family: '${poppins.style.fontFamily}', sans-serif;
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
