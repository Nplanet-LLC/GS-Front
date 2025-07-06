import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Glocal Solutions - Strategic Consultancy & Project Management",
    template: " Glocal Solutions",
  },
  description:
    "Glocal Solutions specializes in large-scale strategic consultancy, construction management, asset & property oversight, and U.S. government contracting support.",
  keywords: [
    "Glocal Solutions",
    "Construction Management",
    "Asset Management",
    "Property Management",
    "US Government Bids",
    "Strategic Consultancy",
    "Public Sector Projects",
    "Private Sector Projects",
  ],
  // metadataBase: new URL("https://your-site.com"),
  authors: [{ name: "Glocal Solutions", url: "https://your-site.com" }],
  creator: "Glocal Solutions",
  openGraph: {
    title: "Glocal Solutions - Strategic Consultancy & Project Management",
    description:
      "Proven track record in large-scale project delivery, construction management, asset/property management, and facilitating government & private sector business.",
    url: "https://your-site.com",
    siteName: "Glocal Solutions",
    images: [
      {
        url: "/logo-dashboaed.png",
        width: 1200,
        height: 630,
        alt: "Glocal Solutions Logo or Project Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glocal Solutions - Strategic Advisory Services",
    description:
      "Expertise in construction, asset management, and U.S. government contracting for public and private industries.",
    creator: "@GlocalSolutions",
    images: ["/logo-dashboaed.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NextTopLoader color="#1565C7" height={3} showSpinner={false} />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
