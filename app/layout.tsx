import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MIGUEL | PORTFOLIO",
  description: "BS Information Technology student specializing in web development, database management, and UI/UX design. View my projects and get in touch.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  keywords: ["Miguel Compañero", "Web Developer", "UI/UX Designer", "Portfolio", "Cavite State University", "Full Stack Developer"],
  authors: [{ name: "Miguel Compañero" }],
  openGraph: {
    title: "MIGUEL | PORTFOLIO",
    description: "BS Information Technology student specializing in web development, database management, and UI/UX design.",
    url: "https://e-portfolio-xyz.vercel.app",
    siteName: "Miguel Compañero Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Miguel Compañero Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIGUEL | PORTFOLIO",
    description: "BS Information Technology student specializing in web development, database management, and UI/UX design.",
    images: ["/portfolio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
