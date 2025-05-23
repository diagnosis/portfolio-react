import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons';

function StudyProjectCard({ project }) {
    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-6 bg-black/70 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col">
                <div className="h-64 overflow-hidden rounded-lg mb-6">
                    <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                
                <h3 className="text-2xl font-bold text-teal-100 mb-4">{project.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, index) => (
                        <span 
                            key={`${project.name}-tech-${index}`}
                            className="px-3 py-1 text-sm rounded-full bg-teal-500/20 text-teal-100"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                
                <p className="text-indigo-100 mb-6 flex-grow text-sm/6">{project.description}</p>
                
                <div className="flex gap-4 mt-auto">
                    {project.link && (
                        <a 
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg hover:from-purple-700 hover:to-teal-700 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                            Repository
                        </a>
                    )}
                    {project.website && (
                        <a 
                            href={project.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:from-teal-700 hover:to-purple-700 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faChrome} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudyProjectCard;