import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import TagGrid from './TagGrid';
import Award from './Award';

const ProjectCard = memo(({ project }) => {
    const navigate = useNavigate();

    const filteredTags = useMemo(() => {
        if (!project.tags) return [];
        return project.tags
            .slice(0, 2)
            .filter(tag => tag !== project.category);
    }, [project.tags, project.category]);

    const handleNavigate = () => navigate(`/project/${project.id}`);

    return (
        <motion.div
            onClick={handleNavigate}
            className="group relative bg-white rounded-[24px] overflow-hidden border-2 border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] duration-500 cursor-pointer h-full"
            style={{ willChange: "transform, box-shadow" }}
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 border-b-2 border-slate-200">
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500"/>
                <Award awards={project.awards}/>
            </div>
            <div className="p-7 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                        {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
                        {project.name}
                    </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                </p>
                <div className="mt-auto pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">
                            {project.startDate}
                            {project.endDate && ` — ${project.endDate}`}
                        </span>
                    </div>
                    <div className="scale-90 origin-right">
                        <TagGrid tags={filteredTags}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export default ProjectCard;