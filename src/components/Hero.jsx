import React from 'react';
import { motion } from 'framer-motion';
import { TbZoom } from "react-icons/tb";
import { FaLinkedinIn } from 'react-icons/fa';

import ScrollingText from './ScrollingText';
import CustomButton from './CustomButton';
import RefractedLayer from './RefractedLayer';

import profile from "../../data/profile.json"

const Hero = () => {
    const [firstName, lastName] = profile.name.split(' ');

    return (
        <section className="relative w-full h-[860px] flex flex-col justify-center items-center overflow-hidden text-center bg-white">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <RefractedLayer size="1600px"/>
                <RefractedLayer size="1300px"/>
                <RefractedLayer size="1000px"/>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 max-w-4xl pointer-events-none"
            >
                <div className="pointer-events-auto flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        {firstName} <br/>
                        <span className="text-blue-600">{lastName.toUpperCase()}</span>
                    </h1>
                    <ScrollingText roles={profile.titles}/>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Optimizing workflows and <span className="text-blue-600">empowering teams</span> through custom development and automated engineering operations.
                    </p>
                    <div className='flex flex-row gap-[15px]'>
                        <CustomButton className="mt-[35px]"
                            title="Projects"
                            to="/work"
                            icon={TbZoom}
                        />
                        <CustomButton className="mt-[35px]"
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

export default Hero;