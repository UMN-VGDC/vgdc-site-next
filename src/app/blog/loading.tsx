"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </>
  );
}

function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeatType: "reverse", repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="rounded-md bg-[#333a47]"
    ></motion.div>
  );
}
