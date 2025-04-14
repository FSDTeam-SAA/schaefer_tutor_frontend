import NProgress from "@/components/providers/NProgress";
import { EdgeStoreProvider } from "@/lib/edgestore";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Schaefer Tutor",
  description:
    "Schaefer Tutor - Your go-to platform for effective and personalized learning.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EdgeStoreProvider>
          <AppProvider>{children}</AppProvider>
        </EdgeStoreProvider>
        <Toaster richColors closeButton />
        <NProgress />
      </body>
    </html>
  );
}
