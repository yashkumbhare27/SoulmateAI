import type { Metadata } from "next";
import { fontSans, fontSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoulMate AI — Find Your Perfect Soulmate with AI",
  description:
    "The only matchmaking AI that tells you why. AI-powered relationship & matrimonial platform for meaningful connections.",
  keywords: [
    "AI matchmaking",
    "soulmate",
    "matrimonial",
    "relationship",
    "compatibility",
    "India",
  ],
  openGraph: {
    title: "SoulMate AI",
    description: "Find Your Perfect Soulmate with AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-plum-black dark:bg-plum-black dark:text-cream selection:bg-primary/25">
        {children}
      </body>
    </html>
  );
}
