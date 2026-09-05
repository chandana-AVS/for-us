import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StarterOps | Enterprise ERP Platform",
  description: "Hackathon-winning role-based enterprise resource planning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#08090d] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
