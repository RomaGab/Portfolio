import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import TagGrid from './TagGrid';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/project/${project.id}`)}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
        >
            <div className={`w-full relative aspect-video overflow-hidden bg-slate-900}`}>
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"/>
                {project.awards && project.awards.length > 0 && (
                    <div className="absolute bottom-4 right-4 flex gap-2 p-2
                                    bg-slate-900/40 backdrop-blur-md rounded-xl
                                    border border-white/10 shadow-2xl">
                        {project.awards.map((award, index) => (
                            <motion.a key={index} href={award.link}
                                target="_blank"
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 5,
                                    filter: "brightness(1.2)"
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="relative cursor-pointer"
                                title={award.title}
                            >
                                <img src={award.icon}
                                    alt={award.title}
                                    className="w-[32px] h-[32px] object-contain drop-shadow-md"
                                />
                                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 hover:opacity-100 transition-opacity rounded-full" />
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        {project.category}
                    </span>
                    <div className="flex gap-2">
                        <TagGrid tags={project.tags}/>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">
                    {project.description}
                </p>
                <p className="m-0 text-[#666] text-sm">{project.startDate} - {project.endDate}</p>
                <p className="m-0 text-[#666] text-sm">{project.additionalInfo}</p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;