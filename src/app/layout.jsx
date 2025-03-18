'use client'
import { Geist } from "next/font/google";
import { DefaultSeo } from 'next-seo'
import StyledComponentsRegistry from '@/lib/registry'
import ThemeProvider from '@/providers/ThemeProvider'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "Saint Daniels Healthcare Rewards",
  description: "Experience healthcare fit for royalty with Saint Daniels.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saintdaniels.com',
    siteName: 'Saint Daniels Healthcare Rewards',
    images: [
      {
        url: 'https://saintdaniels.com/saint-daniels-social.jpg',
        width: 1200,
        height: 630,
        alt: 'Saint Daniels Healthcare Rewards',
      },
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <DefaultSeo {...metadata} />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 