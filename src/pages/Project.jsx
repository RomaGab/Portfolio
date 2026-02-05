import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";
import { useState, useEffect, memo, lazy, Suspense } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

import CustomButton from "../components/CustomButton"
import Award from '../components/Award'
import TagGrid from "../components/TagGrid";
import Tag from '../components/Tag';
import projects from '../../data/projects.json';

const Carousel = lazy(() => import('../components/Carousel'));

const getYouTubeID = (url) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
};

const NavButton = memo(({ project, direction, setDirection, icon: Icon, positionClasses }) => (
    <div className={`fixed z-50 ${positionClasses} md:top-1/2 md:bottom-auto md:-translate-y-1/2`}>
        <Link to={`/project/${project.id}`} onClick={() => setDirection(direction)}>
            <motion.div
                whileHover={{ x: direction * 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 md:p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-500 hover:text-blue-600 hover:border-blue-600 cursor-pointer transition-colors"
            >
                <Icon className="w-6 h-6 md:w-8 md:h-8"/>
            </motion.div>
        </Link>
    </div>
));

const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        video.style.display = "none";
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.src = typeof file === "string" ? file : URL.createObjectURL(file);

        video.onloadeddata = () => { video.currentTime = 10; };

        video.onseeked = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/jpeg");
            resolve(thumbnail);
        };

        video.onerror = (err) => reject("Thumbnail generation failed", err);
    });
};

const ProjectVideo = memo(({ url }) => {
    const videoId = getYouTubeID(url);
    const wrapperClass = "w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner";
    const [autoThumbnail, setAutoThumbnail] = useState(null);

    useEffect(() => {
        if (url && !videoId) {
            generateVideoThumbnail(url)
                .then(thumb => setAutoThumbnail(thumb))
                .catch(err => console.error(err));
        }
    }, [url, videoId]);

    if (videoId) {
        return (
            <div className={wrapperClass}>
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title="Project Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }
    if (url) {
        return (
            <div className={wrapperClass}>
                <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    poster={autoThumbnail}
                >
                    <source src={url} type="video/mp4" />
                </video>
            </div>
        );
    }

    return null;
});

const Box = ({ title, children }) => (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-wider text-sm text-left uppercase">{title}</h3>
        {children}
    </div>
);

const Project = () => {
    const { id } = useParams();
    const [direction, setDirection] = useState(0);

    const currentIndex = projects.findIndex((p) => p.id === id);
    const project = projects[currentIndex];

    const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
    const nextProject = projects[(currentIndex + 1) % projects.length];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 100, damping: 30 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const translateX = useTransform(dx, [-500, 500], [-15, 15]);
    const translateY = useTransform(dy, [-500, 500], [-15, 15]);
    const rotateX = useTransform(dy, [-500, 500], [4, -4]);
    const rotateY = useTransform(dx, [-500, 500], [-4, 4]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    }, [id]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const scrollToDescription = (e) => {
        e.preventDefault();
        const target = document.querySelector("#description-section");
        if (target) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
        }
    };

    if (!project) return <div className="text-center mt-20 font-bold text-slate-400">Project not found</div>;
    const content = project.pageContent;

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-x-hidden">
            <nav className="z-50">
                <NavButton project={prevProject} direction={-1} setDirection={setDirection} icon={HiChevronLeft} positionClasses="bottom-6 left-6 md:left-4 lg:left-8"/>
                <NavButton project={nextProject} direction={1} setDirection={setDirection} icon={HiChevronRight} positionClasses="bottom-6 right-6 md:right-4 lg:right-8"/>
            </nav>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={id}
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex flex-col items-center pb-20"
                >
                    <section className="relative w-full max-w-6xl px-4 md:px-8 mt-24 md:mt-32 mb-12">
                        <div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                            className="relative w-full aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden border border-slate-100 bg-slate-200"
                            style={{ perspective: "1500px" }}
                        >
                            <motion.div
                                style={{ x: translateX, y: translateY, rotateX, rotateY, scale: 1.05 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img
                                    className="absolute inset-0 w-full h-full object-cover select-none"
                                    src={project.thumbnail}
                                    alt={project.name}
                                    loading="eager"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-black/25"/>
                                <motion.h1
                                    className="relative z-10 text-3xl md:text-8xl font-bold text-white tracking-tight drop-shadow-2xl px-4 text-center pointer-events-none"
                                    animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {project.name}
                                </motion.h1>
                            </motion.div>
                            <div className="absolute inset-0 z-40 pointer-events-none">
                                <div className="pointer-events-auto">
                                    <Award awards={project.awards}/>
                                </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-10 hidden md:flex justify-center z-30">
                                <button onClick={scrollToDescription} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-bounce text-white">
                                    <HiChevronDown className="w-5 h-5 md:w-6 md:h-6"/>
                                </button>
                            </div>
                        </div>
                    </section>
                    <div id="description-section" className="w-full max-w-6xl px-4 md:px-8 mx-auto flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
                        <div className='w-full lg:w-2/3 flex flex-col gap-5'>
                            <Box title="Description">
                                <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">{content.description}</p>
                            </Box>
                            {content.videos && content.videos.length > 0 && (
                                <Box title="Videos">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {content.videos.map((url, i) => <ProjectVideo key={i} url={url}/>)}
                                    </div>
                                </Box>
                            )}
                        </div>
                        <div className='w-full lg:w-1/3 flex flex-col gap-5 h-fit lg:sticky lg:top-24'>
                            <Box title="Information">
                                <div className="flex flex-col gap-2">
                                    {content.information && Object.entries(content.information).map(([key, value]) => (
                                        <div key={key} className='flex flex-row justify-between items-center'>
                                            <span className="w-1/2 text-left text-[0.8rem] font-semibold text-slate-400">{key}</span>
                                            <Tag tag={value}/>
                                        </div>
                                    ))}
                                </div>
                            </Box>
                            {content.roles && <Box title="Roles"><TagGrid tags={content.roles}/></Box>}
                            <Box title="Skills"><TagGrid tags={content.skills}/></Box>
                            {content.additionalLink && (
                                <CustomButton title={content.additionalLink.title} to={content.additionalLink.link} fullWidth external/>
                            )}
                        </div>
                    </div>
                    <section className="w-full max-w-6xl px-4 md:px-8 mx-auto mt-10">
                        <Box title="My Work">
                            <div className='flex flex-col gap-[30px]'>
                                <div className="flex text-left flex-col gap-[10px]">
                                    {content.myWork.map((text, i) => (
                                        <div key={i} className='flex flex-row gap-[10px] items-center'>
                                            <FaArrowRightLong className='text-blue-600 flex-shrink-0'/>
                                            <p className="text-slate-700">{text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                    <Suspense fallback={<div className="aspect-video bg-slate-100 animate-pulse rounded-2xl"/>}>
                                        {Object.entries(content.galerie).map(([title, images], index) => (
                                            <div key={index} className="w-full">
                                                <Carousel images={images} title={title}/>
                                            </div>
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                        </Box>
                    </section>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Project;