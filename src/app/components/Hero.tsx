"use client";

import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";
import { fadeVariant } from "@/helpers/framerVariants";

const splineVariants = {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, transition: { duration: 1.0 }, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
};

const Hero = () => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && <Loader />}
            <motion.div variants={fadeVariant}>
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={splineVariants}
                >
                    <Spline
                        onLoad={() => setLoading(false)}
                        scene="https://prod.spline.design/2yU41Or1eP8d7JHb/scene.splinecode"
                        style={{ width: "98vw", height: "92vh" }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
};

export default Hero;
