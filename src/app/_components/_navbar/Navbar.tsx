"use client"
import { Squash as Hamburger } from "hamburger-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import NewWindowIcon from "../../_icons/NewWindowIcon"
import Triangles from "../../_icons/Triangles"
import { exposedItems } from "./NavbarItems"
import NavSidebar from "./NavSidebar"
import {AnimatePresence} from "framer-motion"
import styles from "./styles.module.scss"

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <nav>
        <AnimatePresence>          
          {sidebarOpen && <NavSidebar setSidebarOpen={setSidebarOpen} />}
        </AnimatePresence>
        <div className={`${styles.navbarGradient} h-navbar fixed top-0 z-10 flex w-screen overflow-hidden text-white`}>
          <Link href="/" className="h-navbar flex items-center gap-5 whitespace-nowrap">
            <Image
              src="/images/Navbar-logo.webp"
              alt="VGDC logo"
              width={206}
              height={70}
              className="h-navbar min-w-[206px]"
            />
            <div className="hidden text-[0.9rem] leading-[1.2rem] opacity-40 xl:block">
              University of Minnesota <br /> Video Game Development Club
            </div>
            <Triangles className="absolute left-[8.75rem] top-[-1.875rem] z-[-1] w-[8.125rem] mix-blend-screen" />
          </Link>
          <div className="flex w-full justify-end">
            <ul className="font-header m-0 flex min-h-full list-none p-0">
              {exposedItems
                .filter((e) => e.exposed)
                .map((e, i) => {
                  return (
                    <li key={i} className="h-navbar hidden lg:block">
                      <Link href={e.href} className={styles.navbarItem}>
                        {e.label}
                      </Link>
                    </li>
                  )
                })}
              <li className="h-navbar mr-8 flex items-center">
                <Hamburger color="#41434d" toggle={setSidebarOpen} toggled={sidebarOpen} />
              </li>
              <li className="h-navbar hidden md:block">
                <Link
                  className="bg-primary h-navbar flex items-center gap-1 pl-10 pr-7"
                  href="https://discord.gg/Yst7Zwn4wk"
                  target="_blank"
                >
                  DISCORD
                  <NewWindowIcon className="mt-[1px] h-7 w-7 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={styles.dropShadow}></div>
    </>
  )
}
