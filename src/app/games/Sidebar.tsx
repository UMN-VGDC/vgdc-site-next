"use client";

import { motion } from "framer-motion";
import Triangles from "../_icons/Triangles";
import { GameData } from "./GameData";
import styles from "./sidebar.module.scss";
import SidebarImageSlides from "./SidebarImageSlides";
import { Optional } from "./SidebarOptionalData";

interface Sidebar {
  data: GameData | null;
  setIsSidebarClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ data, setIsSidebarClose }: Sidebar) {
  if (data === null) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center bg-bgSecondary pb-[60px] font-header text-[1.3rem] text-[#323841]">
        <p>No game selected</p>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute z-[1] flex h-full w-full flex-col bg-[#020107]"
      key={data.title}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <button
        className={`${styles.closeButton} flex font-header md:hidden`}
        onClick={() => {
          setIsSidebarClose(true);
        }}
      >
        BACK
      </button>
      <div className={styles.blurredBackground} style={{ backgroundImage: `url(${data.thumbnail})` }}></div>
      <SidebarImageSlides images={[data.thumbnail, data.media1, data.media2, data.media3]} />
      <div className="pointer-events-auto m-4 flex grow flex-col overflow-hidden rounded-[15px] bg-gradient-to-b from-[#0b1016] from-60% to-[#0b101699] text-white">
        <div className="relative bg-gradient-to-r from-primary to-[#cb3edd41] p-[1.3em] lg:p-[1.6em]">
          <h2 className="m-0 w-[calc(100%-90px)] font-header text-[1.4rem] leading-[1.2em] tracking-[1px] [word-spacing:3px] lg:text-[2.2rem]">
            {data.title}
          </h2>
          <Optional.Date data={data.date} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden">
            <Triangles className="absolute right-4 top-0 w-[200px] mix-blend-screen" />
            <div className={styles.playButtonBackground}></div>
            <Optional.Link
              data={data.buildLink}
              placeholder={
                <a className={styles.playButtonDisabled} style={{ background: "gray" }} title="Game Unavailable">
                  <PlayButtonTriangle />
                </a>
              }
            />
          </div>
        </div>
        <div className="overflow-y-scroll px-[1.4rem] pt-[1.5rem] leading-[1.6rem]">
          <Optional.Description data={data.description} />
          <Optional.Theme data={data.theme} />
          <Optional.Credits data={data.credits} />
        </div>
      </div>
    </motion.div>
  );
}

function PlayButtonTriangle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 53">
      <path
        fill="#D9D9D9"
        d="M39 25.268c1.333.77 1.333 2.694 0 3.464L21 39.124c-1.333.77-3-.192-3-1.732V16.608c0-1.54 1.667-2.502 3-1.732l18 10.392z"
      ></path>
    </svg>
  );
}
