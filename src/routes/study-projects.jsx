import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import StudyProjectCard from '../components/StudyProjectCard';
import fetchStudyProjectData from '../api/fetchStudyProjectData';

export const Route = createFileRoute('/study-projects')({
  component: StudyProjects,
});

function StudyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    if (loading) {
      const data = await fetchStudyProjectData();
      setProjects(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
    return createCometAnimation('cometCanvas');
  }, []);

  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-12 font-heading animate-slide-up">
          Study Projects
        </h2>
        <div className="grid grid-cols-1 gap-12 relative z-10 max-w-4xl mx-auto">
          {projects.map((project) => (
            <StudyProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}