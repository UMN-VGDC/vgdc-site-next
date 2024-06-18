import "./globals.css"
import localFont from "next/font/local"
import type { Metadata } from "next"
import Navbar from "./_components/_navbar/Navbar"

const exo = localFont({
  src: [
    {
      path: "./_fonts/Exo2.0-SemiBold.otf",
      weight: "400",
    },
    {
      path: "./_fonts/Exo2.0-ExtraBold.otf",
      weight: "700",
    },
  ],
  variable: "--font-exo",
})

const avenir = localFont({
  src: [
    {
      path: "./_fonts/AvenirLTStd-Roman.otf",
      weight: "400",
    },
    {
      path: "./_fonts/AvenirLTStd-Light.otf",
      weight: "100",
    },
    {
      path: "./_fonts/AvenirLTStd-Black.otf",
      weight: "700",
    },
  ],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Video Game Development Club",
  keywords:
    "video game, club, University of Minnesota, student group, student, game, Minnesota, UMN, UMN student group, UMN club, art, programming, coding, game development, game dev, dev",
  description:
    "We are actors, artists, designers, musicians, programmers, writers, and more! All skill levels are welcome, and we're always willing to teach.",
  authors: [{ name: "Andrew Cao" }],
  twitter: {
    images: [
      {
        url: "/images/site-screenshot.png"
      }
    ],
    card: "summary_large_image",
    title: "Video Game Development Club",
    description: "We are actors, artists, designers, musicians, programmers, writers, and more! All skill levels are welcome, and we're always willing to teach.",
  },
  openGraph: {
    images: [
      {
        url: "/images/site-screenshot.png"
      }
    ],
    title: "Video Game Development Club",
    description: "We are actors, artists, designers, musicians, programmers, writers, and more! All skill levels are welcome, and we're always willing to teach.",
    url: "https://vgdc.club/",
    type: "website"
  }
  
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo.variable} ${avenir.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
