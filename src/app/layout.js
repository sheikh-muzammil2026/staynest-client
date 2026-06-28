import dns from "node:dns"
dns.setServers(['1.1.1.1', '1.0.0.1']);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";

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
        <Providers>  {children}</Providers>

      </body>
    </html>
  );
}


/**
 * app -= er moddhe ache 3 ta folder = (public) , dashboard and success (success holo stripe theke peyment hole success page e niye asbe)
 * dashboard er modde ache - tenant-admin.owner ei 3 ta folder . egulur prottektar moddhe layout.js ache.
 * public =er vitore ache  api, auth, properties (abar er vitore ache propertiesDetails page), UnauthorizedPage
 * r app er moddhe ache ekta layout.js ekhane nicer metadata ache
 * 
 * 
export const metadata = {
  title: {
    default: "StayNest | Premium Rental Marketplace",
    template: "%s | StayNest"
  },
  description: "Discover verified properties, seamless modern leases, and secure direct payments on StayNest.",
  keywords: ["rental", "apartments", "staynest", "property marketplace", "leases"],
};
 * */ 