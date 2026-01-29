import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";

import Award from '../components/Award'
import projects from '../../data/projects.json';

const Project = () => {
    const { id } = useParams();
    const currentIndex = projects.findIndex((p) => p.id === id);
    const project = projects[currentIndex];

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

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-x-hidden">
            <nav className="z-50">
                <div className="fixed bottom-6 left-6 md:top-1/2 md:bottom-auto md:left-4 lg:left-8 md:-translate-y-1/2">
                    <Link to={`/project/${prevProject.id}`}>
                        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.9 }} className="p-3 md:p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-500 hover:text-blue-600 shadow-lg cursor-pointer">
                            <HiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                        </motion.div>
                    </Link>
                </div>
                <div className="fixed bottom-6 right-6 md:top-1/2 md:bottom-auto md:right-4 lg:right-8 md:-translate-y-1/2">
                    <Link to={`/project/${nextProject.id}`}>
                        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }} className="p-3 md:p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-500 hover:text-blue-600 shadow-lg cursor-pointer">
                            <HiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                        </motion.div>
                    </Link>
                </div>
            </nav>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                                <div className="absolute inset-0 bg-black/20" />
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
                                    <button onClick={scrollToDescription} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-bounce flex items-center justify-center cursor-pointer">
                                        <HiChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                    <div className="w-full max-w-3xl px-8 flex flex-col items-center text-center pb-32">
                        <motion.span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-6">
                            {project.category || "Case Study"}
                        </motion.span>
                        <motion.p
                            id="description"
                            className="text-lg md:text-xl text-slate-500 leading-relaxed mb-16 scroll-mt-32"
                        >
                            {project.description}
                        </motion.p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 border-t border-slate-100 w-full pt-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">Timeline</span>
                                <span className="text-slate-900 font-medium text-sm md:text-base">{project.startDate} — {project.endDate}</span>
                            </div>
                            {project.additionalInfo && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">Role</span>
                                    <span className="text-slate-900 font-medium text-sm md:text-base">{project.additionalInfo}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Project;