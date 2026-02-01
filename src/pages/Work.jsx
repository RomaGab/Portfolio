import { useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import ProjectCard from "../components/ProjectCard";
import TagFilter from "../components/TagFilter";
import projects from '../../data/projects.json';

const MemoizedProjectCard = memo(ProjectCard);

const Work = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedTags = useMemo(() => {
        const tags = searchParams.get('tags');
        return tags ? tags.split(',') : [];
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    const allTags = useMemo(() =>
        [...new Set(projects.flatMap(p => p.tags || []))].sort()
    , []);

    const { filteredProjects, availableTags } = useMemo(() => {
        const available = new Set();
        const filtered = projects.filter(project => {
            const projectTags = project.tags || [];
            const isMatch = selectedTags.length === 0 ||
                            selectedTags.every(tag => projectTags.includes(tag));

            if (isMatch) projectTags.forEach(t => available.add(t));
            return isMatch;
        });
        return { filteredProjects: filtered, availableTags: available };
    }, [selectedTags]);

    const toggleTag = useCallback((tag) => {
        const isSelected = selectedTags.includes(tag);

        if (!isSelected && !availableTags.has(tag)) return;

        const nextTags = isSelected
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        setSearchParams(
            nextTags.length > 0 ? { tags: nextTags.join(',') } : {},
            { replace: true, scroll: false }
        );
    }, [selectedTags, availableTags, setSearchParams]);

    return (
        <div className="flex flex-col items-center w-full gap-[100px] mt-[125px]">
            <div className="flex relative flex-col items-center gap-[50px] w-full max-w-7xl">
                <div className="flex flex-col items-center gap-[50px] mb-[75px] p-8 text-center w-full">
                    <h1 id="projects" className="text-[50px] font-bold text-slate-900">
                        My Projects
                    </h1>
                    <TagFilter
                        allTags={allTags}
                        selectedTags={selectedTags}
                        availableTags={availableTags}
                        onToggle={toggleTag}
                        onClear={useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full items-stretch transform-gpu">
                        <AnimatePresence mode='popLayout' initial={false}>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 35,
                                        mass: 1
                                    }}
                                    className="h-full flex flex-col transform-gpu"
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <MemoizedProjectCard project={project}/>
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