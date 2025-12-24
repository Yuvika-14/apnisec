import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Google Font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApniSec | Advanced Cybersecurity Solutions",
  description: "Secure your digital infrastructure with ApniSec's Cloud Security, Reteam Assessment, and VAPT services.",
  keywords: ["Cybersecurity", "VAPT", "Cloud Security", "Pentesting", "ApniSec"],
  authors: [{ name: "ApniSec Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
