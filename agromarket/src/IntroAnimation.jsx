import Lottie from "lottie-react";
import { motion } from "framer-motion";
import CuteBunnies from "./assets/CuteBunnies.json";  // 다운받은 JSON 파일
import "./IntroAnimation.css";

export default function IntroAnimation() {
  return (
    <motion.div
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="intro-character">
        <Lottie animationData={CuteBunnies} loop={true} />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        당신이 원하는 모든 것  Candy🍭
      </motion.h1>
    </motion.div>
  );
}
