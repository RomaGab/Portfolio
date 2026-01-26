import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <h2 className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">
                    Game Developer & AI Specialist
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                    Building intelligent <br /> digital experiences.
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Merging creative game design with advanced machine learning to craft the next generation of interactive media.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 animate-bounce"
            >
                <ArrowDown className="w-6 h-6 text-slate-400" />
            </motion.div>
        </section>
    );
};

export default Hero;