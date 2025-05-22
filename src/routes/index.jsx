import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    useEffect(() => {
        // Create star field
        const starField = document.createElement('div');
        starField.className = 'star-field';
        
        // Create 200 stars with random positions
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.transform = `translateZ(${Math.random() * 500}px)`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starField.appendChild(star);
        }
        
        document.querySelector('.aurora-bg').appendChild(starField);

        // Comet creation function
        const createComet = () => {
            const comet = document.createElement('div');
            comet.className = 'comet';
            
            // Random starting position and angle
            const startSide = Math.random() > 0.5 ? 'top' : 'left';
            const angle = Math.random() * 45 - 22.5; // Random angle between -22.5 and 22.5 degrees
            
            if (startSide === 'top') {
                comet.style.top = '0';
                comet.style.left = `${Math.random() * 100}%`;
                comet.style.setProperty('--travel-distance', `${Math.random() * 100 + 100}vh`);
                comet.style.setProperty('--travel-height', `${Math.random() * 100}vw`);
            } else {
                comet.style.top = `${Math.random() * 100}%`;
                comet.style.left = '0';
                comet.style.setProperty('--travel-distance', `${Math.random() * 100 + 100}vw`);
                comet.style.setProperty('--travel-height', `${Math.random() * 100}vh`);
            }
            
            comet.style.setProperty('--angle', `${angle}deg`);
            
            document.querySelector('.aurora-bg').appendChild(comet);
            
            // Animate the comet
            comet.style.animation = `cometMove ${Math.random() * 2 + 2}s linear`;
            
            // Remove comet after animation
            comet.addEventListener('animationend', () => comet.remove());
        };

        // Create comets at random intervals
        const cometInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to create a comet
                createComet();
            }
        }, 2000);
        
        // Cleanup
        return () => {
            starField.remove();
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