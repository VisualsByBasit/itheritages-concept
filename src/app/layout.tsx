import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AdvisorWidget } from "@/components/advisor/advisor-widget";
import { BootSequence } from "@/components/boot/boot-sequence";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Heritages | Enterprise Technology Partner",
  description:
    "CCIE, MSCP, and CTS-certified systems integrator delivering infrastructure, cloud, cyber security, and unified communications for enterprise, government, and healthcare organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Runs synchronously while the HTML is parsed, so the boot overlay is
          hidden before the first paint on any visit after the first. Reading
          sessionStorage during render instead would either mismatch hydration
          or leave a visible frame of overlay. Kept inline and tiny on purpose —
          it is on the critical path.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('ith-booted'))document.documentElement.dataset.booted='1'}catch(e){}`,
          }}
        />
        {/* Without scripting the overlay could never dismiss itself. */}
        <noscript>
          <style>{`.boot-overlay{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <BootSequence />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <AdvisorWidget />
      </body>
    </html>
  );
}
