import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retro Type",
  description: "A mechanical typewriter style typing practice environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
