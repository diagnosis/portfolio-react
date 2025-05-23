import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../Modal';
import { useState } from 'react';

function StudyProjectCard({ project }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:scale-[1.02] transition-all duration-300 animate-fade-in">
                <img src={project.image} alt={project.name} className="rounded-lg"/>
                <h3 className="text-2xl text-teal-100 mb-2 font-heading">{project.name}</h3>
                <p className="text-indigo-100 mb-2">{project.category}</p>
                
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <p className="text-indigo-100 mb-6">{project.description}</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 rounded-lg bg-teal-500/20 text-teal-100 hover:bg-teal-500/30 transition-all duration-200 cursor-pointer flex items-center gap-2"
                        >
                            Read more 
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-8 text-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200"
                    >
                        View Project <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
                    </a>
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
                        <ul className="list-disc list-inside space-y-2 text-indigo-100">
                            {project.responsibilities.map((item, index) => (
                                <li key={`${project.name}-resp-${index}`} className="text-sm">{item}</li>
                            ))}
                        </ul>
                        
                        <h4 className="text-xl font-heading text-teal-100 mt-6">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, index) => (
                                <span 
                                    key={`${project.name}-tech-${index}`}
                                    className="px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-100"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <h4 className="text-xl font-heading text-teal-100 mt-6">Learning Outcomes</h4>
                        <ul className="list-disc list-inside space-y-2 text-indigo-100">
                            {project.learningOutcomes.map((outcome, index) => (
                                <li key={`${project.name}-outcome-${index}`} className="text-sm">{outcome}</li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default StudyProjectCard;