import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getWebSiteSchema, serializeStructuredData } from "@/lib/structuredData";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

const typomoderno = localFont({
  src: "../../public/fonts/Typomoderno bold.ttf",
  variable: "--font-typomoderno",
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com'),
  title: {
    default: "Jagaco Games - Indie Game Development",
    template: "%s | Jagaco Games",
  },
  description: "Jagaco Games is an indie game development studio creating unique and engaging gaming experiences. Discover our pixel art RPG Quinn's Quest and other innovative indie games.",
  keywords: ["indie games", "game development", "pixel art", "Quinn's Quest", "Jagaco Games", "indie game studio"],
  authors: [{ name: "Jagaco Games" }],
  creator: "Jagaco Games",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Jagaco Games',
    title: 'Jagaco Games - Indie Game Development',
    description: 'Creating unique and engaging gaming experiences',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jagaco Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagaco Games - Indie Game Development',
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
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(websiteSchema) }}
        />
      </head>
      <body className={`${roboto.variable} ${typomoderno.variable} font-roboto antialiased bg-white text-gray-900 min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
