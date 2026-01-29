import { useParams } from 'react-router-dom';

import projects from '../../data/projects.json';

const Project = () => {
    const { id } = useParams();

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <div className="text-center mt-20">Projet introuvable</div>;
    }
    return (
        <div className="flex flex-col items-center gap-[50px] w-full">
            <img className=""
                src={project.thumbnail}
                alt={project.name}
            />
        </div>
    );
};

export default Project;