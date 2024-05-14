"use client";

import { motion } from "framer-motion";
import { useContext } from "react";
import { GamesSelectContext } from "./GamesSelect";
import styles from "./styles.module.scss";
import { GameData } from "./GameData";

interface PanelWrapper {
  index: number;
  data: GameData;
  children: React.ReactNode;
}

export default function Panel({ index, data, children }: PanelWrapper) {
  const { activeItem, panelSelect } = useContext(GamesSelectContext);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index / 14, duration: 0.4 }}
      className={activeItem === index ? `${styles.panel} ${styles.selected}` : styles.panel}
      onClick={() => panelSelect(index, data)}
    >
      {children}
    </motion.figure>
  );
}
