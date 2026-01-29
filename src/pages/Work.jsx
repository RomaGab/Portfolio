import { FaLinkedinIn } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { useEffect } from 'react';

import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import CustomButton from "../components/CustomButton";
import ProjectCard from "../components/ProjectCard";

import projects from '../../data/projects.json';

const Work = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);
    return (
        <div className="flex flex-col items-center w-full gap-[100px] mt-[125px]">
            <div className="flex relative flex-col items-center gap-[50px]">
                <div className="flex flex-col items-center gap-[50px] mb-[75px] p-8">
                    <h1 id="projects" className="text-center self-center text-[50px] font-bold">My Work</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project) => (
                            <ProjectCard project={project}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Work;