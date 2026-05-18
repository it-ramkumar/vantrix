import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Vantrix | Metal · Power · Van Parts Outlet",
  description: "Industrial-grade LiFePO4 storage, electric and manual awnings, pure sine inverters, and swivel hardware for serious van builds. Built in Big Bear, California.",
  keywords: "vantrix, van parts, LiFePO4 battery, van conversion, awning, pure sine inverter, swivel table, off-grid, sprinter, transit, promaster, van build, 600ah battery",
  authors: [{ name: "Vantrix · Van Parts Outlet" }],
  openGraph: {
    title: "Vantrix | Metal · Power · Van Parts Outlet",
    description: "Industrial-grade LiFePO4 storage, electric and manual awnings, pure sine inverters, and swivel hardware for serious van builds.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favi.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favi.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a]`}>
        {children}
      </body>
    </html>
  );
}