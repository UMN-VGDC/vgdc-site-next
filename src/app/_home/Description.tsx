import Link from "next/link"
import styles from "./description.module.scss"

export default function Description() {
  return (
    <header className={styles.homeParagraphContainer}>
      <div className={styles.homeParagraph}>
        <div className={styles.text}>
          <h2 className="font-header font-bold">Learn with us!</h2>
          <p>
            Welcome to the Video Game Development Club! We are actors, artists, designers, musicians, programmers,
            writers, and more! All skill levels are welcome, and we’re always willing to teach.
          </p>
          <Link
            href="https://discord.gg/Yst7Zwn4wk"
            className={`${styles.discordButton} font-header`}
            target="_blank"
          >
            Join our Discord
          </Link>
        </div>
        <picture>
          <source media="(max-width: 499px)" srcSet="/images/VGDC_Home_Photo_500w.webp" type="image/webp" />
          <source media="(min-width: 500px)" srcSet="/images/VGDC_Home_Photo.webp" type="image/webp" />
          <source srcSet="/images/VGDC_Home_Photo.jpg" type="image/jpeg" />
          <img className="w-full" src="/images/VGDC_Home_Photo.jpg" alt="Fall 2022 Semester Games Showcase" />
        </picture>
      </div>
    </header>
  )
}
