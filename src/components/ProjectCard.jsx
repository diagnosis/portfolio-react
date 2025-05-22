import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div 
                className="bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl text-teal-100 font-heading mb-2">{project.title}</h3>
                <p className="text-indigo-100 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                        <span 
                            key={index}
                            className="px-2 py-1 bg-teal-900/30 text-teal-100 text-sm rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900/95 backdrop-blur-lg rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl text-teal-100 font-heading">{project.title}</h2>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(false);
                                }}
                                className="text-teal-100 hover:text-teal-300 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <p className="text-indigo-100 mb-6">{project.description}</p>
                        <div className="mb-6">
                            <h3 className="text-lg text-teal-100 mb-2">Key Features:</h3>
                            <ul className="list-disc list-inside text-indigo-100">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, index) => (
                                <span 
                                    key={index}
                                    className="px-3 py-1 bg-teal-900/30 text-teal-100 text-sm rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {project.github && (
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-teal-100 hover:text-teal-300 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                    View Code
                                </a>
                            )}
                            {project.live && (
                                <a 
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-teal-100 hover:text-teal-300 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};