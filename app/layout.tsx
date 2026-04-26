import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'BIO*WAIVE* | Luxury Women\'s Fashion UAE',
  description: 'Premium women\'s fashion based in Sharjah, UAE. Shop our latest collections of Abayas, Dresses, and Accessories.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#f8f6f3] text-[#111]">
        {children}
      </body>
    </html>
  );
}
