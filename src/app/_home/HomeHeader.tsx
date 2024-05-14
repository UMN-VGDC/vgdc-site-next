import Link from "next/link"
import React from "react"
import HeadingBackground from "./_graphics/HeadingBackground"
import HeadingTextBG from "./_graphics/HeadingTextBG"
import LandingButton from "./_graphics/LandingButton"
import MobileHeadingBackground from "./_graphics/MobileHeadingBackground"
import MobileHeadingTextBG from "./_graphics/MobileHeadingTextBG"
import HeaderText from "./HeaderText"

export default function HomeHeader() {
  return (
    <div className="top-navbar absolute w-[1150px]">
      <HeadingBackground className="absolute hidden w-full mix-blend-multiply md:block" />
      <HeadingTextBG className="absolute hidden w-full mix-blend-screen md:block" />
      
      <MobileHeadingBackground className="absolute w-screen mix-blend-multiply md:hidden" />
      <MobileHeadingTextBG className="absolute w-screen mix-blend-screen md:hidden" />
      
      <Link href="https://www.youtube.com/watch?v=nsPuef3hBl0" target="_blank" title="Link to reel">
        <LandingButton className="absolute left-[50vw] top-[100vw] w-full max-w-[34vw] -translate-x-1/2 -translate-y-1/2 md:left-[705px] md:top-[468px] md:max-w-[160px]" />
      </Link>

      <HeaderText />
    </div>
  )
}
