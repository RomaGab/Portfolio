import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

import profile from '../../data/profile.json';
import projects from '../../data/projects.json';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const projectList = useMemo(() => projects, []);

    return (
        <footer className="w-full bg-white py-[60px] border-t border-gray-100">
            <div className="max-w-[1100px] mx-auto px-6 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 md:gap-[40px]">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img
                        className="site-logo object-cover"
                        src={profile.profilePicture.icon}
                        alt={profile.profilePicture.alt}
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#b5b5b5] text-[1.2rem] font-semibold mb-[25px]">Projects</h3>
                    <ul className="list-none p-0">
                        {projectList.slice(0, 6).map((project) => (
                            <li key={project.id} className="mb-[12px]">
                                <Link
                                    to={`/project/${project.id}`}
                                    className="no-underline text-black font-bold text-[1.1rem] transition-opacity duration-200 hover:opacity-70"
                                >
                                    {project.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#b5b5b5] text-[1.2rem] font-semibold mb-[25px]">About</h3>
                    <ul className="list-none p-0">
                        <li className="mb-[12px]">
                            <Link
                                to="/about"
                                className="no-underline text-black font-bold text-[1.1rem] transition-opacity duration-200 hover:opacity-70"
                            >
                                About me
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#b5b5b5] text-[1.2rem] font-semibold mb-[25px]">Contact Me</h3>
                    <div className="flex gap-[10px]">
                        <a
                            href={profile.contact}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-[35px] h-[35px] bg-[#1a1a1b] text-white flex items-center justify-center rounded-[4px] no-underline text-[1.1rem] transition-transform duration-200 ease-out hover:-translate-y-[2px] transform-gpu will-change-transform"
                        >
                            <FaLinkedinIn/>
                        </a>
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-[35px] h-[35px] bg-[#1a1a1b] text-white flex items-center justify-center rounded-[4px] no-underline text-[1.1rem] transition-transform duration-200 ease-out hover:-translate-y-[2px] transform-gpu will-change-transform"
                        >
                            <FaGithub/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="max-w-[1100px] mx-auto mt-16 pt-12 text-center text-slate-400 text-sm border-t border-gray-100 px-6">
                <p>© {currentYear} {profile.name}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default React.memo(Footer);