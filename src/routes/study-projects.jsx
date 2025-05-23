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
          {/* Project cards will go here */}
          <div className="flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <h3 className="text-2xl text-teal-100 mb-4 font-heading">Coming Soon</h3>
            <p className="text-indigo-100">
              Study projects section is under development. Check back soon for updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}