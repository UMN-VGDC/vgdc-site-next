"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./sidebar.module.scss";

interface SidebarImageSlides {
  images: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    };
  },
};

export default function SidebarImageSlides({ images }: SidebarImageSlides) {
  const media = images
    .map((e, i) => {
      return {
        src: e,
        index: i,
      };
    })
    .filter((e) => e.src);

  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1 | 0>(0);

  const [buttonsDisable, setButtonsDisable] = useState(false);
  const handleSlides = (direction: 1 | -1) => {
    setSlide((prev) => prev + direction);
    setDirection(direction);
    setButtonsDisable(true);
    setTimeout(() => {
      setButtonsDisable(false);
    }, 300);
  };

  return (
    <div className="relative mt-5 flex min-h-[250px] w-full justify-center">
      {media.length > 1 && (
        <div
          className={`absolute z-[3] flex h-full w-full items-center justify-between px-5 ${
            buttonsDisable ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <SlideButton onClick={() => handleSlides(-1)} />
          <SlideButton onClick={() => handleSlides(1)} right />
        </div>
      )}
      <AnimatePresence>
        {media.map((e) => {
          if (e.index !== Math.abs(slide % media.length)) return;
          return (
            <motion.div
              className="absolute h-[250px]"
              key={e.index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <Image src={e.src} width={500} height={250} alt="game screenshot" className="h-[250px] w-auto object-cover" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

type SlideButton = React.HTMLAttributes<HTMLButtonElement> & {
  right?: boolean;
};

function SlideButton({ right, ...props }: SlideButton) {
  return (
    <button className={`${styles.buttons} ${right ? "-scale-x-100" : ""}`} {...props}>
      <svg
        className="mr-[2px]"
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999998 14.732C-0.333336 13.9622 -0.333334 12.0377 0.999999 11.2679L19 0.875642C20.3333 0.105841 22 1.06809 22 2.60769L22 23.3923C22 24.9319 20.3333 25.8942 19 25.1244L0.999998 14.732Z"
          fill="#D9D9D9"
        />
      </svg>
    </button>
  );
}
