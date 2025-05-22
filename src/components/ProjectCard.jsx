import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import {Modal} from "../../Modal.jsx";

export const ProjectCard = ({ project }) => {
    const [selected, setSelected] = useState('')
    return (
                <>
                    <div className='project-card bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:bg-teal-500 transform transition-all duration-300 animate-fade-in'>
                        <h3 className='text-2xl text-teal-100 mb-4 font-heading'>
                            {project.name}
                        </h3>
                        <p className='text-lg text-gray-200'>
                            {project.client}
                        </p>
                        <button onClick={
                            e => {
                                setSelected(project)
                            }
                        }
                                className='btn-details p-3 text-white border-2'>Show Details</button>
                        {
                            selected ?
                                (<Modal>
                                    <h1>{selected.name}</h1>
                                    <p>{selected.description}</p>
                                </Modal>) : ''
                        }
                        <a className='block' href={project.url} target='_blank' rel='noreferrer'>
                            <FontAwesomeIcon icon={faExternalLink} className="text-teal-400" />
                        </a>
                    </div>
                </>
            )


};