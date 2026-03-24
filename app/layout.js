import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Coffeeland FC | Best Football Academy in Chikmagalur",
  description:
    "Join Coffeeland FC, Chikkamagaluru's premier KSFA-affiliated football academy. Grassroots development, competitive excellence, and summer camps since 2010.",
  keywords:
    "Football coaching in Chikmagalur, Best football academy in Chikkamagaluru, KSFA affiliated football club, Summer football camp Chikmagalur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceGrotesk.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
