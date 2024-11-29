'use client'
import {motion} from "framer-motion"
export default function Loading(){
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-full border-t-4 border-purple-500 border-opacity-50"
          />
        </div>
      );
}