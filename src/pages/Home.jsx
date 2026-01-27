import { FaLinkedinIn } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";

import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import CustomButton from "../components/CustomButton";
import ProjectCard from "../components/ProjectCard";

import profile from '../../data/profile.json';
import projects from '../../data/projects.json';

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-[50px] w-full py-20">
            <Hero/>
            <div className="flex flex-col items-center gap-[50px] mb-[75px]">
                <h1 id="projects" className="text-center self-center text-[50px] font-bold">My Work</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => (
                        <ProjectCard project={project}/>
                    ))}
                </div>
                {/* <CustomButton title={"See more"} to={"/work"}/> */}
            </div>
            <img className="profile-picture"
                src={profile.profilePicture.icon}
                alt={profile.profilePicture.alt}
            />
            <AboutMe/>
            <div className="flex flex-row items-center gap-[10px]">
                <CustomButton title={"Learn more"} to={"/about"} icon={FaSearch}/>
                <CustomButton title={"Contact me"} to={profile.contact} icon={FaLinkedinIn}/>
            </div>
        </div>
    );
};

export default Home;