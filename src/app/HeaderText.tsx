"use client"

import { motion } from "framer-motion"

const headerText: React.ReactNode[] = [
  <>
    <Arrow color="#86FFF8" />
    CREATE
  </>,
  <>
    <Arrow color="#D9C6F2" />
    DESIGN
  </>,
  <>
    <Arrow color="#ff65f0" />P<span className="ml-[-3px] mr-[4px]">L</span>AY
  </>,
]

export default function HeaderText() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration:1 }}
      className="home-heading font-header font-bold"
    >
      {headerText.map((e, i) => {
        return (
          <motion.span
            initial={{ marginLeft: -150 }}
            animate={{ marginLeft: 0 + i * 20 }}
            transition={{ delay: 1.4 + i * 0.1, ease: [0.62, -0.63, 0.24, 1.99], duration: 1 }}
            className="flex items-center gap-1"
            key={i}
          >
            {e}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

type Arrow = React.HTMLAttributes<SVGElement> & {
  color: string
}

function Arrow({ color, ...props }: Arrow) {
  return (
    <svg
      width="34"
      height="38"
      viewBox="0 0 34 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 mt-2 w-[4vw] lg:w-auto"
      {...props}
    >
      <path
        d="M32 15.5359C34.6667 17.0755 34.6667 20.9245 32 22.4641L6.5 37.1865C3.83333 38.7261 0.499998 36.8016 0.499998 33.7224L0.5 4.27757C0.5 1.19837 3.83333 -0.726135 6.5 0.813465L32 15.5359Z"
        fill={color}
      />
    </svg>
  )
}
