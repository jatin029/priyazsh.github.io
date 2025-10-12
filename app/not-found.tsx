"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowLeft } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { cabin, epilogue } from "./utils/fonts";
import { useEffect } from "react";
import Image from "next/image";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Priyansh Prajapat";
  }, []);
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-2xl">
        <motion.h1
          className={`text-9xl font-black bg-gradient-to-r from-[#00FFA3] via-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent mb-3 ${cabin.className}`}
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          404
        </motion.h1>
        <motion.div
          className="relative mb-10 mx-auto max-w-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="relative bg-white text-neutral-900 rounded-3xl p-8 shadow-2xl border-4 border-[#DC1FFF]">
            <p className={`text-xl leading-relaxed ${epilogue.className}`}>
              yo chat, you&apos;re lowkey lost 😭 this page ain&apos;t real 💀. Go hydrate or somethin&apos; 🥛
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[25px] border-t-white drop-shadow-lg"></div>
            </div>
          </div>
        </motion.div>{" "}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="/jal-lijiye-404.png"
            alt="Jal Lijiye - drink some water"
            width={300}
            height={300}
            className="rounded-2xl"
            priority
          />
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] hover:from-[#DC1FFF] hover:to-[#00FFA3] rounded-xl transition-all duration-500 cursor-pointer shadow-xl shadow-[#DC1FFF]/50 hover:shadow-2xl hover:shadow-[#00FFA3]/60 font-bold text-white"
          >
            <IoHomeOutline size={20} />
            take me home fr fr
          </Link>
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-800 hover:bg-neutral-700 border-2 border-[#00FFA3] rounded-xl transition-all duration-300 cursor-pointer font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuArrowLeft size={20} />
            nah, go back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
