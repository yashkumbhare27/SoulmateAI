import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontSerif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});
