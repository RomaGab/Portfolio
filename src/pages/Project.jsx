import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";
import { useState, useEffect } from 'react';

import CustomButton from "../components/CustomButton"
import Award from '../components/Award'
import Carousel from '../components/Carousel';
import TagGrid from "../components/TagGrid";

import projects from '../../data/projects.json';

const NavButton = ({ project, direction, setDirection, icon: Icon, positionClasses }) => (
    <div className={`fixed z-50 ${positionClasses} md:top-1/2 md:bottom-auto md:-translate-y-1/2`}>
        <Link to={`/project/${project.id}`} onClick={() => setDirection(direction)}>
            <motion.div
                whileHover={{ x: direction * 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 md:p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-500 hover:text-blue-600 hover:border-blue-600 shadow-lg cursor-pointer transition-colors"
            >
                <Icon className="w-6 h-6 md:w-8 md:h-8"/>
            </motion.div>
        </Link>
    </div>
);

const ProjectVideo = ({ url }) => {
    const getYouTubeID = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="w-full aspect-video overflow-hidden bg-black">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeID(url)}?rel=0&modestbranding=1`}
                title="Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

const Project = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    const { id } = useParams();
    const currentIndex = projects.findIndex((p) => p.id === id);
    const project = projects[currentIndex];
    const [direction, setDirection] = useState(0);

    const prevProject = currentIndex === 0
        ? projects[projects.length - 1]
        : projects[currentIndex - 1];

    const nextProject = currentIndex === projects.length - 1
        ? projects[0]
        : projects[currentIndex + 1];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const translateX = useTransform(dx, [-500, 500], [-15, 15]);
    const translateY = useTransform(dy, [-500, 500], [-15, 15]);
    const rotateX = useTransform(dy, [-500, 500], [4, -4]);
    const rotateY = useTransform(dx, [-500, 500], [-4, 4]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        mouseX.set(centerX);
        mouseY.set(centerY);
    };

    const scrollToDescription = (e) => {
        e.preventDefault();
        const target = document.querySelector("#description");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (!project) return <div className="text-center mt-20 font-bold">Projet introuvable</div>;

    const content = project.pageContent;

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-x-hidden">
            <nav className="z-50">
                <NavButton
                    project={prevProject}
                    direction={-1}
                    setDirection={setDirection}
                    icon={HiChevronLeft}
                    positionClasses="bottom-6 left-6 md:left-4 lg:left-8"
                />
                <NavButton
                    project={nextProject}
                    direction={1}
                    setDirection={setDirection}
                    icon={HiChevronRight}
                    positionClasses="bottom-6 right-6 md:right-4 lg:right-8"
                />
            </nav>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={id}
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    custom={direction}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center"
                >
                    <section className="relative w-full max-w-6xl px-4 md:px-8 mt-24 md:mt-32 mb-12">
                        <div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                            className="relative w-full aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 bg-slate-50"
                            style={{ perspective: "1500px" }}
                        >
                            <motion.div
                                style={{ x: translateX, y: translateY, rotateX, rotateY, scale: 1.05 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img
                                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                                    src={project.thumbnail}
                                    alt={project.name}
                                />
                                <div className="absolute inset-0 bg-black/20"/>
                                <motion.h1
                                    animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 text-3xl md:text-8xl font-bold text-white tracking-tight drop-shadow-2xl px-4 text-center"
                                >
                                    {project.name}
                                </motion.h1>
                            </motion.div>
                            <Award awards={project.awards}/>
                            <div className="absolute inset-x-0 bottom-10 flex justify-center z-30 pointer-events-none">
                                <motion.div className="pointer-events-auto">
                                    <button onClick={scrollToDescription} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-bounce flex items-center justify-center cursor-pointer hover:border-white transition-colors">
                                        <HiChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white"/>
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                    <div className="flex flex-row justify-between gap-[50px]">
                        <div className='flex flex-col gap-[50px]'>
                            <div className=''>
                                <h3 className="">Description</h3>
                                <p id="description" className="scroll-mt-32">
                                    {project.description}
                                </p>
                            </div>
                            {content.videos && (
                                <div className=''>
                                    <h3 className="">Videos</h3>
                                    <div className="flex flex-row gap-[10px]">
                                        {content.videos.map((mediaUrl, index) => (
                                            <ProjectVideo key={index} url={mediaUrl}/>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-[50px]'>
                            <div className="">
                                <h3 className="">Information</h3>
                                <div className="flex flex-col">
                                    {content.information && Object.entries(content.information).map(([key, value]) => (
                                        <div key={key} className='flex flex-row gap-[10px]'>
                                            <span className="">{key}</span>
                                            <span className="">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <h3 className="">My Role</h3>
                                <TagGrid tags={project.tags}/>
                            </div>
                            {content.additionalLink && (
                                <CustomButton
                                    title={content.additionalLink.title}
                                    to={content.additionalLink.link}
                                />
                            )}
                        </div>
                    </div>
                    <section className="p-10">
                        <h3 className="">My Work</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
                            {Object.entries(content.galerie).map(([title, images], index) => (
                                <div key={index} className="w-full">
                                    <Carousel images={images} title={title} />
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Project;