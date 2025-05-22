import { createFileRoute } from '@tanstack/react-router';
import { ProjectCard } from '../components/ProjectCard';
import { useEffect } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';

export const Route = createFileRoute('/projects')({
  component: Projects,
});

function Projects() {
  useEffect(() => {
    return createCometAnimation();
  }, []);

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and TailwindCSS, featuring interactive animations and a dynamic project showcase.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      technologies: ["React", "TailwindCSS", "Vite", "TanStack Router"],
      features: [
        "Responsive design with TailwindCSS",
        "Interactive animations",
        "Dynamic project cards with modal views",
        "Contact form integration"
      ],
      github: "https://github.com/yourusername/portfolio",
      live: "https://your-portfolio.com"
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, shopping cart, and secure checkout functionality.",
      image: "https://images.pexels.com/photos/34577/pexels-photo.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "User authentication",
        "Product catalog",
        "Shopping cart",
        "Secure payments with Stripe"
      ],
      github: "https://github.com/yourusername/ecommerce",
      live: "https://your-ecommerce.com"
    }
  ];

  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-12 font-heading animate-slide-up">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}