import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <motion.h1
        initial={{ color: "transparent", scale: 0 }}
        animate={{ color: "white", scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 300 }}
        style={{ fontWeight: "bold" }}
      >
        ReaQ
      </motion.h1>
    </motion.header>
  );
};

export default Header;
