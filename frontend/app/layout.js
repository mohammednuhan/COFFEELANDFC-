import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const inter = Inter({
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} ${inter.variable}`}>
        <div id="bg-particles"></div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
