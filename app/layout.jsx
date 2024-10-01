
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "../components/Providers"
import "./globals.css";

import { Manrope } from 'next/font/google'
const inter = Manrope({
  subsets: ['cyrillic'],
  display: "swap",
})

export const metadata = {
  title: "Safethrow",
  description: "Sigmaworks corporaton",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} font-medium text-black  overflow-x-hidden`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
