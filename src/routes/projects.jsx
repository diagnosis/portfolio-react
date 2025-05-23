import { createFileRoute } from '@tanstack/react-router';
import { ProjectCard } from '../components/ProjectCard';
import {useEffect, useState} from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import fetchProjectData from "../api/fetchProjectData.js";

export const Route = createFileRoute('/projects')({
  component: Projects,
});

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)


  async function loadProjects() {
    if(loading){
      const data = await fetchProjectData()
      console.log(data)
      setProjects(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
    return createCometAnimation('cometCanvas');
  }, []);


  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-12 font-heading animate-slide-up">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}