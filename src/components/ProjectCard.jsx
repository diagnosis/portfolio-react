import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';
import { Modal } from '../Modal';
import { useState } from 'react';

export const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderLinks = () => {
        if (!project.link || (Array.isArray(project.link) && project.link.length === 0)) {
            return (
                <div className='mt-8 text-center px-4 py-2 bg-gray-700/50 text-gray-400 rounded-lg cursor-not-allowed'>
                    Internal Project
                </div>
            );
        }

        if (Array.isArray(project.link)) {
            return (
                <div className='mt-8 grid grid-cols-2 gap-2'>
                    <a 
                        href={project.link[0]} 
                        target="_blank" 
                        rel="noreferrer"
                        className='flex items-center justify-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200'
                    >
                        <FontAwesomeIcon icon={faApple} className="mr-2" />
                        iOS App
                    </a>
                    <a 
                        href={project.link[1]} 
                        target="_blank" 
                        rel="noreferrer"
                        className='flex items-center justify-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200'
                    >
                        <FontAwesomeIcon icon={faAndroid} className="mr-2" />
                        Android App
                    </a>
                </div>
            );
        }

        return (
            <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className='mt-8 text-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200'
            >
                View Project <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
            </a>
        );
    };

    return (
        <>
            <div className='flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:scale-[1.02] transition-all duration-300 animate-fade-in'>
                <h3 className='text-2xl text-teal-100 mb-2 font-heading'>{project.name}</h3>
                <p className='text-indigo-100 mb-4'>{project.client}</p>
                
                <div className='flex-1 flex flex-col'>
                    <div className="flex-1">
                        <p className='text-indigo-100 mb-6'>{project.description}</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className='inline-flex items-center text-teal-300 hover:text-teal-400 transition-colors duration-200 group'
                        >
                            Read more 
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    {renderLinks()}
                </div>
            </div>

            {isModalOpen && (
                <Modal>
                    <div className="relative space-y-4 text-white">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-teal-500/20 text-teal-100 hover:bg-teal-500/30 transition-colors duration-200"
                        >
                            ×
                        </button>
                        <h3 className="text-2xl font-heading text-teal-100">{project.name}</h3>
                        <p className="text-indigo-100">{project.description}</p>
                        
                        <h4 className="text-xl font-heading text-teal-100 mt-6">Responsibilities</h4>
                        <ul className='list-disc list-inside space-y-2 text-indigo-100'>
                            {project.responsibilities.map((item, index) => (
                                <li key={`${project.name}-resp-${index}`} className='text-sm'>{item}</li>
                            ))}
                        </ul>
                        
                        <h4 className="text-xl font-heading text-teal-100 mt-6">Technologies</h4>
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

                        {project.outcome && (
                            <>
                                <h4 className="text-xl font-heading text-teal-100 mt-6">Outcome</h4>
                                <p className="text-indigo-100">{project.outcome}</p>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};