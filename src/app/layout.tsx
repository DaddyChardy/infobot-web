import type { Metadata } from "next";
import Providers from "../components/Providers";
import "./globals.css";
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Infobot Web App",
  description: "Your Infobot web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/infobot.png" />
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body
        className="min-h-screen w-full text-gray-900"
        style={{
          /* Multi-stop diagonal gradient with your color palette */
          background:
            "linear-gradient(45deg, #7F00FF 0%, #6000ED 25%, #4000C0 50%, #000080 75%, #000051 100%)",
        }}
      >
        {/* Wrap the entire app with NextAuth session provider */}
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
