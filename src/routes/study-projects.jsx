import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import { ProjectCard } from '../components/ProjectCard';

export const Route = createFileRoute('/study-projects')({
  component: StudyProjects,
});

function StudyProjects() {
  useEffect(() => {
    return createCometAnimation();
  }, []);

  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-12 font-heading animate-slide-up">
          Study Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {

          }

        </div>
      </div>
    </section>
  );
}