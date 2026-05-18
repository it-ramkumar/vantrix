import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Cryonex | Premium Climate Control Systems for Mobile Living",
  description: "Professional-grade refrigeration, ventilation, and climate systems engineered for vans, RVs, and off-grid living. Cryonex delivers comfort in every climate.",
  keywords: "cryonex, climate control, van refrigeration, RV ventilation, compressor fridge, roof ventilation, skylight, mobile living, off-grid, van conversion, camper van, climate systems",
  authors: [{ name: "Cryonex Climate Systems" }],
  openGraph: {
    title: "Cryonex | Premium Climate Control Systems for Mobile Living",
    description: "Professional-grade climate solutions engineered for exceptional performance in mobile environments",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav-icon3.png" type="image/png" />
        <link rel="apple-touch-icon" href="/fav-icon3.png" />
        <meta                                                                                                                                                                                                                                                                                                                                                                                                                                                                          name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0a]`}
      >
        {children}
      </body>
    </html>
  );
}