

import Providers from "../components/Providers"
import "./globals.css";

import { Manrope } from 'next/font/google'
const inter = Manrope({
  subsets: ['cyrillic'],
  display: "swap",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-medium text-black/80 antialiased overflow-x-hidden`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
