import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    useEffect(() => {
        // Comet creation function
        const createComet = () => {
            const comet = document.createElement('div');
            comet.className = 'comet';
            
            // Random angle between -30 and 30 degrees
            const angle = Math.random() * 60 - 30;
            
            // Calculate random start position (from left side)
            const startX = -100;
            const startY = Math.random() * window.innerHeight;
            
            // Calculate end position based on angle
            const distance = window.innerWidth + 200; // Extra distance to ensure full crossing
            const radians = angle * (Math.PI / 180);
            const endX = startX + (distance * Math.cos(radians));
            const endY = startY + (distance * Math.sin(radians));
            
            comet.style.setProperty('--start-x', `${startX}px`);
            comet.style.setProperty('--start-y', `${startY}px`);
            comet.style.setProperty('--end-x', `${endX}px`);
            comet.style.setProperty('--end-y', `${endY}px`);
            comet.style.setProperty('--angle', `${angle}deg`);
            
            document.querySelector('.aurora-bg').appendChild(comet);
            
            // Animate the comet
            comet.style.animation = `cometMove ${1.5 + Math.random()}s linear forwards`;
            
            // Remove comet after animation
            comet.addEventListener('animationend', () => comet.remove());
        };

        // Create comets at random intervals
        const cometInterval = setInterval(() => {
            if (Math.random() > 0.6) { // 40% chance to create a comet
                createComet();
            }
        }, 1000);
        
        // Cleanup
        return () => {
            clearInterval(cometInterval);
        };
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
                    <details className="mt-4 text-sm sm:text-base md:text-lg text-teal-100 animate-fade-in">
                        <summary className="cursor-pointer hover:text-teal-300 transition-colors duration-200">
                            Details
                        </summary>
                        <div className="bg-black/30 backdrop-blur-sm text-teal-100 p-4 rounded-lg mt-2 shadow-xl border border-teal-500/20">
                            This is a secret.
                        </div>
                    </details>
                    <Link
                        to="/contact"
                        className="block self-center w-fit mt-6 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-indigo-100 hover:text-purple-300 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-200 animate-fade-in shadow-lg hover:shadow-xl"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}