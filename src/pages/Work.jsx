import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import ProjectCard from "../components/ProjectCard";
import TagFilter from "../components/TagFilter";
import projects from '../../data/projects.json';

const Work = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedTags, setSelectedTags] = useState(() => {
        const tagsFromUrl = searchParams.get('tags');
        return tagsFromUrl ? tagsFromUrl.split(',') : [];
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        if (selectedTags.length > 0) {
            setSearchParams({ tags: selectedTags.join(',') });
        } else {
            setSearchParams({});
        }
    }, [selectedTags, setSearchParams]);

    const allTags = useMemo(() => {
        const tags = new Set();
        projects.forEach(p => p.tags?.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return projects;
        return projects.filter(project =>
            selectedTags.every(tag => project.tags?.includes(tag))
        );
    }, [selectedTags]);

    const availableTags = useMemo(() => {
        const available = new Set();
        filteredProjects.forEach(p => {
            p.tags?.forEach(t => available.add(t));
        });
        return available;
    }, [filteredProjects]);

    const toggleTag = (tag) => {
        if (!availableTags.has(tag) && !selectedTags.includes(tag)) return;
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="flex flex-col items-center w-full gap-[100px] mt-[125px]">
            <div className="flex relative flex-col items-center gap-[50px]">
                <div className="flex flex-col items-center gap-[50px] mb-[75px] p-8 text-center w-full max-w-7xl">
                    <h1 id="projects" className="text-[50px] font-bold text-slate-900">
                        My Work
                    </h1>
                    <TagFilter
                        allTags={allTags}
                        selectedTags={selectedTags}
                        availableTags={availableTags}
                        onToggle={toggleTag}
                        onClear={() => setSelectedTags([])}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full items-stretch">
                        <AnimatePresence mode='popLayout' initial={false}>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        zIndex: 0,
                                        transition: { duration: 0.2 } 
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 35
                                    }}
                                    style={{ zIndex: 1 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="h-full w-full overflow-hidden flex flex-col">
                                        <ProjectCard project={project} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Work;