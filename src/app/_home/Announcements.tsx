"use client"
import React, { useRef, useState } from "react"
import styles from "./styles.module.scss"

export default function Announcements({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null!)
  const listRef = useRef<HTMLDivElement>(null!)

  return (
    <aside
      className={`${isExpanded ? styles.announcementsExpanded : "h-[250px]"} ${
        styles.announcements
      } overflow-hidden transition-all`}
      ref={containerRef}
    >
      <div className="rounded-t-[8px] bg-gradient-to-r from-primary to-[#d236bd2a] px-5 py-[0.4rem] text-[1.2rem]">
        <h2 className="m-0 font-header text-[1.15rem]">Recent Announcements</h2>
        <button
          className="noSelect absolute bottom-4 z-[1] flex items-center font-light opacity-70 transition-opacity hover:opacity-100 md:hidden xl:flex"
          onClick={() => {
            setIsExpanded(!isExpanded)
            if (isExpanded) {
              listRef.current.scrollTo(0, 0)
              return
            }
            setTimeout(() => {
              containerRef.current.scrollIntoView({
                block: window.innerWidth <= 768 ? "center" : "end",
                inline: "nearest",
              })
            }, 200)
          }}
        >
          <ExpandArrow />
          <div>Read More</div>
        </button>
      </div>
      <div className={isExpanded ? styles.announcementListExpanded : styles.announcementListCollapsed} ref={listRef}>
        {children}
      </div>
    </aside>
  )
}

function ExpandArrow() {
  return (
    <svg
      className="mb-[2px]] mr-2 h-2 w-auto"
      width="34"
      height="38"
      viewBox="0 0 34 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 15.5359C34.6667 17.0755 34.6667 20.9245 32 22.4641L6.5 37.1865C3.83333 38.7261 0.499998 36.8016 0.499998 33.7224L0.5 4.27757C0.5 1.19837 3.83333 -0.726135 6.5 0.813465L32 15.5359Z"
        fill="white"
      />
    </svg>
  )
}
