import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageEntryLoader from "@/components/PageEntryLoader";
import SplashScreen from "@/components/SplashScreen";
import RouteProgressBar from "@/components/RouteProgressBar";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "The Backpacking Club at UCLA",
    template: "%s — TUBC",
  },
  description: "The Backpacking Club is an inclusive community of outgoing and adventurous people who enjoy exploring the outdoors, love nature, and are dedicated to outdoor stewardship.",
  keywords: ["UCLA", "backpacking", "hiking", "outdoor club", "UCLA hiking club", "TUBC", "backpacking club", "Los Angeles hiking"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: "The Backpacking Club at UCLA",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/staff-group.jpg",
        width: 1200,
        height: 630,
        alt: "The Backpacking Club at UCLA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Backpacking Club at UCLA",
    description: "The Backpacking Club is an inclusive community of outgoing and adventurous people who enjoy exploring the outdoors, love nature, and are dedicated to outdoor stewardship.",
    images: ["/staff-group.jpg"],
  },
  metadataBase: new URL("https://www.uclabackpackingclub.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
    >
      <body className="min-h-full flex flex-col bg-parchment text-bark font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>
        <SplashScreen />
        <RouteProgressBar />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <Toaster position="bottom-center" richColors />
        <PageEntryLoader />
      </body>
    </html>
  );
}
