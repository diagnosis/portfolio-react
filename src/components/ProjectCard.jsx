import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProjectCard = ({project}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-in overflow-hidden'>
            <h3 className='text-2xl text-teal-100 mb-2 font-heading'>{project.name}</h3>
            <p className='text-indigo-100 mb-4'>{project.client}</p>
            
            <div className='flex-1 flex flex-col'>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className='flex items-center justify-between w-full px-4 py-2 mb-4 text-left text-teal-100 bg-teal-500/10 rounded-lg hover:bg-teal-500/20 transition-colors duration-200'
                >
                    <span>Project Details</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='overflow-y-auto'
                            style={{ maxHeight: '60vh' }}
                        >
                            <div className="pr-2">
                                <p className='text-indigo-100 mb-4'>{project.description}</p>
                                <ul className='list-disc list-inside space-y-2 text-indigo-100 mb-4'>
                                    {project.responsibilities.map((item, index) => (
                                        <li key={index} className='text-sm'>{item}</li>
                                    ))}
                                </ul>
                                
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.technologies?.map((tech, index) => (
                                        <span 
                                            key={index}
                                            className='px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-100'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className='mt-auto text-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 rounded-lg hover:text-purple-300 transition-colors duration-200'
                >
                    View Project
                </a>
            </div>
        </div>
    );
};