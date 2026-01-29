import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com'),
  title: {
    default: "Jagaco Studios - Indie Game Development",
    template: "%s | Jagaco Studios",
  },
  description: "Jagaco Studios is an indie game development studio creating unique and engaging gaming experiences. Discover our pixel art RPG Quinn's Quest and other innovative indie games.",
  keywords: ["indie games", "game development", "pixel art", "Quinn's Quest", "Jagaco Studios", "indie game studio"],
  authors: [{ name: "Jagaco Studios" }],
  creator: "Jagaco Studios",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Jagaco Studios',
    title: 'Jagaco Studios - Indie Game Development',
    description: 'Creating unique and engaging gaming experiences',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jagaco Studios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagaco Studios - Indie Game Development',
    description: 'Creating unique and engaging gaming experiences',
    creator: '@JagacoGames',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
