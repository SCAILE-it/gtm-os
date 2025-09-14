import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/components/user-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gtm-agentic-dashboard.vercel.app'),
  title: "SCAILE GTM Operating System",
  description: "AI-Powered Go-to-Market Operating System - Your complete GTM stack in one platform",
  keywords: ["GTM", "Go-to-Market", "AI", "Operating System", "Analytics", "CRM", "Marketing"],
  authors: [{ name: "SCAILE", url: "https://scaile.com" }],
  creator: "SCAILE",
  publisher: "SCAILE",
  openGraph: {
    title: "SCAILE GTM Operating System",
    description: "AI-Powered Go-to-Market Operating System - Your complete GTM stack in one platform",
    url: "https://gtm.scaile.com",
    siteName: "SCAILE GTM OS",
    images: [
      {
        url: "/scaile-logo.svg",
        width: 1200,
        height: 630,
        alt: "SCAILE GTM Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCAILE GTM Operating System",
    description: "AI-Powered Go-to-Market Operating System - Your complete GTM stack in one platform",
    images: ["/scaile-logo.svg"],
    creator: "@scaile_it",
  },
  icons: {
    icon: "/scaile-logo.svg",
    shortcut: "/scaile-logo.svg",
    apple: "/scaile-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}