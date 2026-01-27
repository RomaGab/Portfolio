import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';

import ScrollingText from './ScrollingText';
import CustomButton from './CustomButton';
import RefractedLayer from './RefractedLayer';

import profile from "../../data/profile.json"

const Hero = () => {

    const scrollToProjects = (e) => {
        e.preventDefault();
        const projectsSection = document.querySelector("#projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };
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
                className="relative z-20 max-w-4xl mt-[150px] pointer-events-none"
            >
                <div className="pointer-events-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        {firstName} <br/>
                        <span className="text-blue-600">{lastName.toUpperCase()}</span>
                    </h1>
                    <ScrollingText roles={profile.titles}/>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Optimizing workflows and <span className="text-blue-600">empowering teams</span> through custom development and automated engineering operations.
                    </p>
                    <CustomButton className="mt-[35px]" title={"Contact me"} to={profile.contact} icon={FaLinkedinIn}/>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="relative z-20 mt-[70px] animate-bounce pointer-events-auto">
                <a href="#projects" onClick={scrollToProjects}>
                    <ArrowDown className="w-6 h-6 text-slate-400"/>
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;