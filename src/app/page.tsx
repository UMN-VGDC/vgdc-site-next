"use client"

import { useRef } from "react"
import Announcements from "./Announcements"
import Description from "./Description"
import HomeHeader from "./HomeHeader"

export default function Page() {
  const introVideo = useRef<HTMLVideoElement>(null!)
  const bgVideo = useRef<HTMLDivElement>(null!)

  return (
    <>
      <div className="min-w-full h-screen relative">
        <video className="home-intro" poster="/videos/vgdcIntro.webp" autoPlay muted playsInline ref={introVideo}>
          <source src="/videos/vgdcWebMTest.hevc.mp4" type="video/mp4; codecs='hvc1'" />
          <source src="/videos/vgdcWebMTest.mkv" type="video/mp4" />
        </video>
        <div ref={bgVideo}>
          <video className="home-video-mobile md:hidden" poster="/videos/VGDCReelCutMobile.webp" autoPlay loop muted playsInline>
            <source src="/videos/VGDCReelCutMobile.mp4" type="video/mp4" />
          </video>
          <video className="home-video hidden md:block" poster="/videos/VGDCReelCut.webp" autoPlay loop muted playsInline>
            <source src="/videos/VGDCReelCut.mp4" type="video/mp4" />
          </video>
        </div>
        <HomeHeader />
        {/* <Announcements />
        <Description /> */}
      </div>
    </>
  )
}
