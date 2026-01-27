import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';

import ScrollingText from './ScrollingText';
import CustomButton from './CustomButton';

import profile from "../../data/profile.json"

const Hero = () => {
    const scrollToProjects = (e) => {
        e.preventDefault();
        const projectsSection = document.querySelector("#projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <section className="mt-[120px] mb-[40px] flex flex-col justify-center items-center bg-gray-50 text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <ScrollingText roles={profile.titles}/>
                {/* <h2 className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">
                    Atlassian Engineer & Automation Specialist
                </h2> */}
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                    Optimizing workflows, <br/>
                    <span className="text-blue-600">Empowering teams.</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Merging custom development with advanced automation to architect
                    scalable solutions and streamline high-performance engineering operations.
                </p>
            </motion.div>
            <CustomButton className="mt-[35px]" title={"Contact me"} to={profile.contact} icon={FaLinkedinIn}/>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-[70px] animate-bounce"
            >
                <a href="#projects" onClick={scrollToProjects}>
                    <ArrowDown className="w-6 h-6 text-slate-400"/>
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;