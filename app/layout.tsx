import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "White Screen Tools",
  description: "Fullscreen colour tools for lighting, testing, and focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
