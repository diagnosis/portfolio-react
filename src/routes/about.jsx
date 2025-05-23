import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import { PhotoGallery } from '../components/PhotoGallery';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  useEffect(() => {
    return createCometAnimation('cometCanvas');
  }, []);

  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          {/* About Me Content */}
          <div className="bg-black/70 p-8 rounded-lg ring-1 ring-gray-900/5">
            <h2 className="text-4xl text-teal-100 mb-6 font-heading">About Me</h2>
            <div className="prose prose-invert space-y-6">
              <p className="text-indigo-100 leading-relaxed">
                With over 9 years as a Software Development Engineer in Test, I specialize in test automation and CI/CD pipelines using Jenkins, GitLab, and Bitrise. My journey in quality assurance began with a fascination for ensuring software reliability, which led me to master tools like Kotlin, Java, JavaScript, and Cucumber. I've built robust BDD/TDD frameworks for mobile testing on both Android and iOS platforms, ensuring seamless user experiences across devices. One of my proudest achievements was leading a QA team in an Agile environment to reduce release cycles by 30% through automated testing pipelines, a testament to my commitment to efficiency and quality. I thrive on solving complex problems, optimizing workflows, and mentoring teams to deliver high-quality software that meets user needs.
              </p>
              <p className="text-indigo-100 leading-relaxed">
                Beyond my technical expertise, I'm deeply passionate about continuous growth and innovation. I love learning new technologies, constantly improving my skillset, and generating fresh ideas to push the boundaries of what's possible in software testing. This curiosity drives me to explore emerging tools and methodologies, ensuring I stay at the forefront of the industry. When I'm not immersed in code, you'll often find me hiking in nature, where the tranquility of the outdoors inspires creativity and clarity. These experiences recharge me, fueling my drive to bring creativity and precision to my work as a Software Development Engineer in Test.
              </p>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="bg-black/70 p-8 rounded-lg ring-1 ring-gray-900/5">
            <h3 className="text-2xl text-teal-100 mb-6 font-heading">Nature Photography</h3>
            <PhotoGallery />
          </div>
        </div>
      </div>
    </section>
  );
}