import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollingText = ({roles}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    });

    return (
        <div className="h-[100px] overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={roles[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4"
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default ScrollingText;