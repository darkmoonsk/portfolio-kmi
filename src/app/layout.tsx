import type { Metadata } from "next";
import { Bangers, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kmi Portafolio",
  description: "Kmi Portafolio",
};

const japanDaisuki = localFont({
  src: "./fonts/Japan Daisuki.otf",
  variable: "--font-japan-daisuki",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bangers.variable} ${poppins.variable} ${japanDaisuki.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
