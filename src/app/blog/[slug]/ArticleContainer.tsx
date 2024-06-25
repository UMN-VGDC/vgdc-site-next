"use client";

import { motion } from "framer-motion";
import styles from "../../_components/basicPage.module.scss";

export default function ArticleContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "circOut" }}
      className={styles.basicPage}
    >
      {children}
    </motion.article>
  );
}
