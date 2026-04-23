import type { Metadata } from "next";
import { Fraunces, Nunito, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "The Backpacking Club at UCLA",
    template: "%s — TUBC",
  },
  description: "Experience the outdoors without restrictions. UCLA's premier backpacking and hiking club.",
  keywords: ["UCLA", "backpacking", "hiking", "outdoor club", "UCLA hiking club", "TUBC", "backpacking club", "Los Angeles hiking"],
  openGraph: {
    siteName: "The Backpacking Club at UCLA",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/staff-group.jpg",
        width: 1200,
        height: 630,
        alt: "The Backpacking Club at UCLA",
      },
    ],
  },
  metadataBase: new URL("https://www.uclabackpackingclub.com"),
  alternates: {
    canonical: "https://www.uclabackpackingclub.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fraunces.variable, nunito.variable, dmMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-parchment text-bark font-body">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
