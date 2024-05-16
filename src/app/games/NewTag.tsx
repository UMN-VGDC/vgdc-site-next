"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.scss";

export default function NewTag({ date }: { date: string }) {
  const handleLetterAnim = (text: string) => {
    const textArr = text.split("");

    const variants = {
      slide: {
        y: [0, -3, 3, 0],
      },
    };
    return textArr.map((e, i) => {
      return (
        <motion.span
          key={i}
          variants={variants}
          animate="slide"
          transition={{
            delay: i * 0.05,
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          {e}
        </motion.span>
      );
    });
  };

  const parsedDate = Date.parse(date);
  const monthInMilliseconds = 2629746000;
  if (Date.now() - monthInMilliseconds < parsedDate) {
    return <div className={`${styles.newTag} font-header`}>{handleLetterAnim("NEW!")}</div>;
  }
}
