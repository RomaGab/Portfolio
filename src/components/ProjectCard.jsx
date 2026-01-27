import React, { useState } from 'react';
import { motion } from 'framer-motion';

import TagGrid from './TagGrid';

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            // layoutId={`card-container-${project.id}`}
            // onClick={() => onClick(project)}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`w-[400px] relative aspect-video overflow-hidden bg-slate-900}`}>
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        {project.category}
                    </span>
                    <div className="flex gap-2">
                        <TagGrid tags={project.tags}/>
                        {/* {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {tag}
                            </span>
                        ))} */}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">
                    {project.description}
                </p>
                <div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;