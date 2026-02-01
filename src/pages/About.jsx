import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';

import AboutMe from "../components/AboutMe";
import Timeline from "../components/Timeline";
import CustomButton from "../components/CustomButton";
import profile from '../../data/profile.json';

const About = () => {
    const [view, setView] = useState('experiences');

    return (
        <div className="flex flex-col items-center gap-[50px] w-full py-20 mt-[100px]">
            <img
                className="profile-picture"
                src={profile.profilePicture.icon}
                alt={profile.profilePicture.alt}
            />
            <AboutMe/>
            <CustomButton
                title="Contact Me"
                to={profile.contact}
                external
                icon={FaLinkedinIn}
            />
            <div className="w-1/2 max-w-xl h-[1px] bg-slate-200" />
            <div className="flex bg-slate-100 mt-[40px] p-1 rounded-full border border-slate-200 shadow-sm">
                <button
                    onClick={() => setView('experiences')}
                    className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        view === 'experiences'
                        ? 'bg-white shadow-md text-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Experiences
                </button>
                <button
                    onClick={() => setView('education')}
                    className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        view === 'education'
                        ? 'bg-white shadow-md text-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Education
                </button>
            </div>
            <div className="w-full flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="w-full flex justify-center">
                        {
                            view === 'experiences'
                                ? <Timeline data={profile.experience}/>
                                : <Timeline data={profile.education}/>
                        }
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default About;