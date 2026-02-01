import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TbZoom } from "react-icons/tb";
import { FaLinkedinIn } from 'react-icons/fa';

import ScrollingText from './ScrollingText';
import CustomButton from './CustomButton';
import RefractedLayer from './RefractedLayer';

import profile from "../../data/profile.json";

const LAYERS_SIZES = ["1600px", "1300px", "1000px"];

const Hero = () => {
    const { firstName, lastName } = useMemo(() => {
        const [first, last] = profile.name.split(' ');
        return { firstName: first, lastName: last };
    }, []);

    return (
        <section className="relative w-full min-h-screen md:h-[860px] flex flex-col justify-center items-center overflow-hidden text-center bg-white px-6 pt-32 md:pt-0">
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                {LAYERS_SIZES.map((size) => (
                    <RefractedLayer key={size} size={size}/>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 w-full max-w-4xl pointer-events-none"
            >
                <div className="pointer-events-auto flex flex-col items-center w-full">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        {firstName} <br/>
                        <span className="text-blue-600">{lastName.toUpperCase()}</span>
                    </h1>
                    <ScrollingText roles={profile.titles}/>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
                        Optimizing workflows and <span className="text-blue-600">empowering teams</span> through custom development and automated engineering operations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-[15px] mt-[35px] w-full">
                        <CustomButton
                            title="Projects"
                            to="/work"
                            icon={TbZoom}
                        />
                        <CustomButton
                            title="Contact Me"
                            to={profile.contact}
                            icon={FaLinkedinIn}
                            external
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default React.memo(Hero);