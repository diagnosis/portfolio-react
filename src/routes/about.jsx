import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
            <div className="prose prose-invert">
              <p className="text-indigo-100 mb-4">
                Senior Software Engineer in Test with a passion for creating robust automation frameworks
                and exploring the boundaries of software quality. When I'm not coding, you'll find me
                capturing the beauty of nature through my lens.
              </p>
              <p className="text-indigo-100">
                My journey in technology has been driven by curiosity and a desire to build tools that
                make a difference. I specialize in test automation, but I'm also deeply interested in
                full-stack development and creative coding.
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