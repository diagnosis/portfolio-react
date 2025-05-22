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
      title: "LuxSUV",
      description: "LUX SUV Transportation - A comprehensive test automation framework for web and mobile applications, featuring end-to-end testing capabilities.",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      technologies: ["Java", "Selenium", "Appium", "TestNG", "Maven"],
      features: [
        "End-to-end test automation",
        "Cross-platform mobile testing",
        "CI/CD integration",
        "Detailed reporting"
      ],
      status: "Current",
      client: "LUX SUV Transportation"
    },
    {
      title: "Companion App Test Automation",
      description: "Developed and implemented automated testing solutions for Wizards of the Coast's companion mobile application.",
      image: "https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg",
      technologies: ["Java", "Appium", "Selenium", "REST Assured", "Jenkins"],
      features: [
        "Mobile app automation",
        "API testing integration",
        "Cross-platform compatibility",
        "Continuous integration workflow"
      ],
      status: "Completed",
      client: "Wizards of the Coast"
    },
    {
      title: "Health Connect Automation",
      description: "Automated testing framework for Providence Health Services' healthcare connectivity platform.",
      image: "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
      technologies: ["Python", "Selenium", "PyTest", "Docker", "AWS"],
      features: [
        "Healthcare systems integration testing",
        "Automated compliance verification",
        "Cloud-based test execution",
        "Security testing protocols"
      ],
      status: "Completed",
      client: "Providence Health Services"
    },
    {
      title: "ADP Migration Testing",
      description: "Led the testing efforts for Sempra Energy's ADP system migration, ensuring data integrity and system functionality.",
      image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg",
      technologies: ["Java", "Selenium", "JUnit", "SQL", "Jenkins"],
      features: [
        "Data migration validation",
        "System integration testing",
        "Performance testing",
        "Automated regression suite"
      ],
      status: "Completed",
      client: "Sempra Energy"
    },
    {
      title: "PMS Mobile App Testing",
      description: "Comprehensive mobile application testing framework for Hilton's Property Management System.",
      image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg",
      technologies: ["Java", "Appium", "TestNG", "REST Assured", "Azure DevOps"],
      features: [
        "Mobile app automation",
        "Cross-device testing",
        "API integration testing",
        "Automated deployment verification"
      ],
      status: "Completed",
      client: "Hilton"
    },
    {
      title: "Japan Migration & UK Chip and PIN",
      description: "Managed testing for American Express's Japan market migration and UK Chip and PIN implementation.",
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg",
      technologies: ["Python", "Robot Framework", "Selenium", "Jenkins", "Docker"],
      features: [
        "International payment systems testing",
        "Security compliance verification",
        "Cross-market functionality testing",
        "Automated security scanning"
      ],
      status: "Completed",
      client: "American Express"
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