import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

export const ProjectCard = ({ project }) => {
    return (
        <div className='flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:scale-105 transition-all duration-300 animate-fade-in'>
            <h3 className='text-2xl text-teal-100 mb-2 font-heading'>{project.name}</h3>
            <p className='text-indigo-100 mb-4'>{project.client}</p>
            
            <div className='flex-1 flex flex-col'>
                <details className="group mb-4">
                    <summary className='cursor-pointer flex items-center justify-between w-full px-4 py-2 text-left text-teal-100 bg-teal-500/10 rounded-lg hover:bg-teal-500/20 transition-colors duration-200'>
                        <span>Project Details</span>
                    </summary>
                    
                    <div className="mt-4 space-y-4 pr-2">
                        <p className='text-indigo-100'>{project.description}</p>
                        <ul className='list-disc list-inside space-y-2 text-indigo-100'>
                            {project.responsibilities.map((item, index) => (
                                <li key={`${project.name}-resp-${index}`} className='text-sm'>{item}</li>
                            ))}
                        </ul>
                        
                        <div className='flex flex-wrap gap-2'>
                            {project.technologies?.map((tech, index) => (
                                <span 
                                    key={`${project.name}-tech-${index}`}
                                    className='px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-100'
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </details>

                <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className='mt-auto text-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200'
                >
                    View Project <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
                </a>
            </div>
        </div>
    );
};