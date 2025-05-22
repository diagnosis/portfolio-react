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
      title: "Bolt",
      description: "An AI-powered coding assistant that helps developers write better code faster. Built with React and integrated with OpenAI's GPT models.",
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg",
      technologies: ["React", "Node.js", "OpenAI API", "WebContainers API"],
      features: [
        "Real-time code suggestions",
        "Natural language processing",
        "Code explanation and documentation",
        "Multi-language support"
      ],
      github: "https://github.com/stackblitz/bolt",
      live: "https://bolt.dev"
    },
    {
      title: "Test Automation Framework",
      description: "A comprehensive test automation framework for web applications using Selenium WebDriver and TestNG.",
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
      technologies: ["Java", "Selenium", "TestNG", "Maven"],
      features: [
        "Page Object Model design pattern",
        "Data-driven testing",
        "Parallel test execution",
        "Detailed HTML reports"
      ],
      github: "https://github.com/safademirhan9/test-automation-framework",
      live: null
    },
    {
      title: "Mobile Testing Framework",
      description: "Cross-platform mobile testing framework using Appium for iOS and Android applications.",
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
      technologies: ["Java", "Appium", "TestNG", "REST Assured"],
      features: [
        "Cross-platform support",
        "API integration testing",
        "Screenshot capture on failure",
        "CI/CD integration"
      ],
      github: "https://github.com/safademirhan9/mobile-testing-framework",
      live: null
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