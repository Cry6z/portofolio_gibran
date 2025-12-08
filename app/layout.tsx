import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { PortfolioProvider } from "@/context/portfolio-data";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gibran | Full Stack Developer",
  description:
    "Portofolio Gibran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} antialiased`}
      >
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
