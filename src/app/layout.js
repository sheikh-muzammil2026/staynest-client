import dns from "node:dns"
dns.setServers(['1.1.1.1', '1.0.0.1']);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StayNest | Premium Rental Marketplace",
    template: "%s | StayNest"
  },
  description: "Discover verified properties, seamless modern leases, and secure direct payments on StayNest.",
  keywords: ["rental", "apartments", "staynest", "property marketplace", "leases"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-slate-50 antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
