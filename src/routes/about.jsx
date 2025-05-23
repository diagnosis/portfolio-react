import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import { PhotoGallery } from '../components/PhotoGallery';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <div className={`relative ${!isExpanded && 'max-h-[300px] overflow-hidden md:max-h-none md:overflow-visible'}`}>
                <p className="text-indigo-100 leading-relaxed">
                  With over 9 years as a Software Development Engineer in Test, I specialize in test automation and CI/CD pipelines using Jenkins, GitLab, and Bitrise. My journey in quality assurance began with a fascination for ensuring software reliability, which led me to master tools like Kotlin, Java, JavaScript, and Cucumber. I've built robust BDD/TDD frameworks for mobile testing on both Android and iOS platforms, ensuring seamless user experiences across devices. One of my proudest achievements was leading a QA team in an Agile environment to reduce release cycles by 30% through automated testing pipelines, a testament to my commitment to efficiency and quality. I thrive on solving complex problems, optimizing workflows, and mentoring teams to deliver high-quality software that meets user needs.
                </p>
                <p className="text-indigo-100 leading-relaxed">
                  Beyond my technical expertise, I'm deeply passionate about continuous growth and innovation. I love learning new technologies, constantly improving my skillset, and generating fresh ideas to push the boundaries of what's possible in software testing. This curiosity drives me to explore emerging tools and methodologies, ensuring I stay at the forefront of the industry. When I'm not immersed in code, you'll often find me hiking in nature, where the tranquility of the outdoors inspires creativity and clarity. These experiences recharge me, fueling my drive to bring creativity and precision to my work as a Software Development Engineer in Test.
                </p>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
                )}
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 px-4 py-2 bg-teal-500/20 text-teal-100 rounded-lg hover:bg-teal-500/30 transition-colors duration-200 md:hidden"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
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