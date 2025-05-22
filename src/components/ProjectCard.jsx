




export const ProjectCard = ({project}) => {

        return (
            <>
                <div className='flex flex-col items-center bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-in'>
                    <h3>{project.name}</h3>
                    <p>{project.client}</p>
                    <div>
                        <details>
                            <summary>Project Details</summary>
                            {project.description}
                            {project.responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </details>
                        <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
                    </div>

                </div>
            </>
        )


}