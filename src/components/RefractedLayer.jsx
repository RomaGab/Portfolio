import React from 'react';
import { motion } from 'framer-motion';

const RefractedLayer = ({size}) => {
    return (
        <motion.div
            className="absolute rounded-full overflow-hidden border border-white/20 shadow-xl bg-white pointer-events-none"
            style={{
                width: size,
                height: size,
                left: "50%",
                top: "50%",
                zIndex: -1,
            }}
            initial={{ x: "-50%", y: "-50%", scale: 0.8, opacity: 0 }}
            animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundSize: 'cover',
                    scale: 1.2,
                }}
            />
        </motion.div>
    );
};

export default RefractedLayer;