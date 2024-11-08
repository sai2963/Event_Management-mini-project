import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const RevealOnScroll = dynamic(() => import("@/components/RevealOnScroll"), {
  ssr: false,
});

const RevealOnScrollComponent = ({ children, delay = 0 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold: 0.3 }
      );
      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ duration: 0.8, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default function ContentComp() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <>
      <section className="min-h-screen flex items-center justify-center p-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={textVariants}
            className="mb-6 text-3xl md:text-5xl font-bold leading-relaxed tracking-tight"
          >
            <RevealOnScrollComponent delay={0.2}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                We are{" "}
              </span>

              <span className="text-white">
                storytellers, wizards, builders, producers, planners, problem
                solvers.
              </span>
            </RevealOnScrollComponent>
          </motion.div>
          <RevealOnScrollComponent delay={0.4}>
            <motion.div
              variants={textVariants}
              className="mb-6 text-3xl md:text-5xl font-bold leading-relaxed tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                We are{" "}
              </span>
              <span className="text-white">
                creatives, innovators, disruptors, dreamers, doers.
              </span>
            </motion.div>
          </RevealOnScrollComponent>
          <RevealOnScrollComponent delay={0.6}>
            <motion.div
              variants={textVariants}
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                We are{" "}
              </span>
              <span className="text-white">EventMaster.</span>
            </motion.div>
          </RevealOnScrollComponent>
        </motion.section>
      </section>
    </>
  );
}
