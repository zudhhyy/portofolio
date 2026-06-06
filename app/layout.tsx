import type { Metadata } from "next";
import { CursorTrail } from "@/components/cursor-trail";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tubaguszuhdi.com"),
  title: {
    default: "Tubagus D Zuhdi | Senior Frontend Engineer",
    template: "%s | Tubagus D Zuhdi",
  },
  description:
    "Senior Frontend Developer building scalable React, Next.js, TypeScript, and React Native products for remote teams worldwide.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "React Native",
    "Remote JavaScript Developer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Remote Developer",
    "Onsite Developer",
    "Freelance Developer",
    "Contract Developer",
    "Full-Time Developer",
    "Part-Time Developer",
    "Remote Work",
    "Onsite Work",
    "Freelance Work",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Tubagus D Zuhdi | Senior Frontend Engineer",
    description:
      "Tubagus D Zuhdi's Portfolio - Building web and mobile products with React, Next.js, TypeScript, and React Native.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
