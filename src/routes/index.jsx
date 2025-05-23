import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    useEffect(() => {
        return createCometAnimation('cometCanvas');
    }, []);

    return (
        <section className="aurora-bg -mt-[64px]">
            <div className='px-4 mx-auto flex max-w-screen-xl flex-wrap items-center min-h-screen'>
                <div className="flex flex-col items-left relative z-10 bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-teal-500/20">
                    <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-teal-100 animate-slide-up">
                        I am,
                    </p>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-shadow-custom mt-2 animate-bounce-in">
                        Safa Demirkan
                    </h1>
                    <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl text-teal-100 mt-4 animate-slide-up">
                        Sr. Software Engineer in Test and Creative Developer
                    </p>
                    <p className="text-indigo-100 mt-6 text-lg animate-fade-in">
                        A passionate software engineer with extensive experience in test automation and development. 
                        I thrive on creating robust testing frameworks and building innovative solutions. 
                        Always eager to learn and share knowledge with the developer community.
                    </p>
                    <Link
                        to="/contact"
                        className="block self-center w-fit mt-6 bg-gradient-to-r from-blue-800 via-purple-700 to-fuchsia-600 text-indigo-100 hover:text-purple-300 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-200 animate-fade-in shadow-lg hover:shadow-xl"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}