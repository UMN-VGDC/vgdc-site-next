import Announcements from "./_home/Announcements"
import Description from "./_home/Description"
import FetchAnnouncements from "./_home/FetchAnnouncements"
import HomeHeader from "./_home/HomeHeader"
import styles from "./_home/styles.module.scss"

export default function Page() {
  return (
    <>
      <div className="relative h-screen min-w-full">
        <video className={styles.homeIntro} poster="/videos/vgdcIntro.webp" autoPlay muted playsInline>
          <source src="/videos/vgdcWebMTest.hevc.mp4" type="video/mp4; codecs='hvc1'" />
          <source src="/videos/vgdcWebMTest.mkv" type="video/mp4" />
        </video>
        <div>
          <video
            className={`${styles.homeVideoMobile} md:hidden`}
            poster="/videos/VGDCReelCutMobile.webp"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/VGDCReelCutMobile.mp4" type="video/mp4" />
          </video>
          <video
            className={`${styles.homeVideo} hidden md:block`}
            poster="/videos/VGDCReelCut.webp"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/VGDCReelCut.mp4" type="video/mp4" />
          </video>
        </div>
        <HomeHeader />
        <Announcements>
          <FetchAnnouncements />
        </Announcements>
        <Description />
      </div>
    </>
  )
}
