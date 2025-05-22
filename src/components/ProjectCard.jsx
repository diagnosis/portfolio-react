import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Current':
                return 'bg-purple-600';
            case 'Completed':
                return 'bg-blue-600';
            case 'In-Progress':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <>
            <div 
                className="bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="relative">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                </div>
                <h3 className="text-xl text-teal-100 font-heading mb-2">{project.title}</h3>
                <p className="text-sm text-teal-300 mb-2">{project.client}</p>
                <p className="text-indigo-100 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <span 
                            key={index}
                            className="px-2 py-1 bg-teal-900/30 text-teal-100 text-sm rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-teal-900/30 text-teal-100 text-sm rounded-full">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900/95 backdrop-blur-lg rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl text-teal-100 font-heading">{project.title}</h2>
                                <p className="text-teal-300">{project.client}</p>
                            </div>
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
                        <div className="relative">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
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
                    </div>
                </div>
            )}
        </>
    );
};