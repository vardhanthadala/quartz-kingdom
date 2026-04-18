import { Cormorant_Garamond, Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata = {
  title: "Quartz Kingdom | High-Grade Industrial Minerals",
  description: "Global standard in quartz and silica extraction since 1998.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${syne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
