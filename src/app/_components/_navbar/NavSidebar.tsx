import { motion } from "framer-motion"
import Link from "next/link"
import { exposedItems } from "./NavbarItems"
import styles from "./styles.module.css"

interface NavSidebar {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavSidebar({ setSidebarOpen }: NavSidebar) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "100vh" }}
      exit={{ height: 0 }}
      onClick={() => setSidebarOpen(false)}
      className={`${styles.navSidebar} top-navbar pointer-events-none fixed right-0 z-20 w-screen overflow-hidden`}
    >
      <ul className="pointer-events-auto mx-[2rem] list-none pt-6">
        <DiscordNavItem />
        <NavbarItems />
      </ul>
    </motion.div>
  )
}

function NavbarItems() {
  return exposedItems.map((e, i) => {
    return (
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.04 }}
        key={i}
        className={`font-header text-end ${e.exposed ? "lg:hidden" : ""}`}
      >
        <Link href={e.href} className="text-[9vw] leading-[5rem] md:text-[4rem]">
          {e.label}
        </Link>
      </motion.li>
    )
  })
}

function DiscordNavItem() {
  return (
    <li className={`${styles.discordGradient} font-header text-end`}>
      <Link
        className="text-[9vw] leading-[5rem] md:hidden md:text-[4rem]"
        href="https://discord.gg/Yst7Zwn4wk"
        target="_blank"
      >
        DISCORD
      </Link>
    </li>
  )
}
