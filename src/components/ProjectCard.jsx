import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Handle body scroll lock when modal is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isModalOpen]);

    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isDownSwipe = distance < -50;
        if (isDownSwipe) {
            setIsModalOpen(false);
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

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

    const handleModalClose = useCallback((e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsModalOpen(false);
    }, []);

    const handleCardClick = useCallback((e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }, []);

    const handleModalContentClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    return (
        <>
            <div 
                className="bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
            >
                <div className="relative">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        loading="lazy"
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
                <div 
                    className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 overflow-y-auto overscroll-contain"
                    onClick={handleModalClose}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        className="bg-gray-900/95 backdrop-blur-lg rounded-lg p-6 max-w-2xl w-full my-8 relative mx-4"
                        onClick={handleModalContentClick}
                    >
                        <button 
                            onClick={handleModalClose}
                            className="absolute right-4 top-4 text-teal-100 hover:text-teal-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-xl"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                        
                        <div className="mb-4">
                            <h2 className="text-2xl text-teal-100 font-heading">{project.title}</h2>
                            <p className="text-teal-300">{project.client}</p>
                        </div>
                        
                        <div className="relative">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                                loading="lazy"
                            />
                            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <p className="text-indigo-100 mb-6">{project.description}</p>
                        
                        <div className="mb-6">
                            <h3 className="text-lg text-teal-100 mb-2">Key Features:</h3>
                            <ul className="list-disc list-inside text-indigo-100 space-y-1">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
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