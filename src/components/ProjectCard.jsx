import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import TagGrid from './TagGrid';
import Award from './Award'

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
                <Award awards={project.awards}/>
            </div>
            <div className="p-6 flex flex-col gap-[5px]">
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
                <div className='flex flex-col gap-[15px]'>
                    <p className="text-slate-500 text-sm line-clamp-2">
                        {project.description}
                    </p>
                    <p className="m-0 text-[#666] text-sm">
                        {project.additionalInfo && <span>{project.additionalInfo} • </span>}
                        {project.startDate} - {project.endDate}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;