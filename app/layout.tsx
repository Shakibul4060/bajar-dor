import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "প্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}