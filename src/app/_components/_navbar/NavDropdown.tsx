"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { exposedItems } from "./NavbarItems";
import styles from "./styles.module.scss";

interface NavDropdown {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavDropdown({ setSidebarOpen }: NavDropdown) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0.5 }}
      animate={{ height: "100vh", opacity: 1 }}
      exit={{ height: 0, opacity: 0.5 }}
      onClick={() => setSidebarOpen(false)}
      className={`pointer-events-none fixed right-0 top-navbar z-20 w-screen overflow-hidden bg-gradient-to-b from-[#1d1a45bf] to-[#000000b9] to-95% backdrop-blur-md`}
    >
      <ul className="pointer-events-auto mx-[2rem] h-full list-none pt-6">
        <DiscordNavItem />
        <NavbarItems />
      </ul>
    </motion.div>
  );
}

function NavbarItems() {
  return exposedItems.map((e, i) => {
    return (
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.04 }}
        key={i}
        className={`text-end font-header font-bold ${e.exposed ? "lg:hidden" : ""}`}
      >
        <Link href={e.href} className="text-[9vw] leading-[5rem] md:text-[4rem]">
          {e.label}
        </Link>
      </motion.li>
    );
  });
}

function DiscordNavItem() {
  return (
    <li className={`${styles.discordGradient} text-end font-header font-bold`}>
      <Link
        className="text-[9vw] leading-[5rem] md:hidden md:text-[4rem]"
        href="https://discord.gg/Yst7Zwn4wk"
        target="_blank"
      >
        DISCORD
      </Link>
    </li>
  );
}
