import { createFileRoute } from '@tanstack/react-router'
import { SkillCard } from '../SkillCard.jsx'
import { useEffect } from 'react'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
    useEffect(() => {
        // Comet creation function
        const createComet = () => {
            const comet = document.createElement('div');
            comet.className = 'comet';
            
            const angle = Math.random() * 60 - 30;
            const startX = -100;
            const startY = Math.random() * window.innerHeight;
            
            const distance = window.innerWidth + 200;
            const radians = angle * (Math.PI / 180);
            const endX = startX + (distance * Math.cos(radians));
            const endY = startY + (distance * Math.sin(radians));
            
            comet.style.setProperty('--start-x', `${startX}px`);
            comet.style.setProperty('--start-y', `${startY}px`);
            comet.style.setProperty('--end-x', `${endX}px`);
            comet.style.setProperty('--end-y', `${endY}px`);
            comet.style.setProperty('--angle', `${angle}deg`);
            
            document.querySelector('.aurora-bg').appendChild(comet);
            
            comet.style.animation = `cometMove ${1.5 + Math.random()}s linear forwards`;
            comet.addEventListener('animationend', () => comet.remove());
        };

        const cometInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                createComet();
            }
        }, 1000);
        
        return () => {
            clearInterval(cometInterval);
        };
    }, []);

    const skillCategories = [
        {
            title: 'Programming Languages',
            items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'Swift']
        },
        {
            title: 'Frontend Development',
            items: ['React', 'Vue.js', 'Next.js', 'TailwindCSS', 'HTML5/CSS3']
        },
        {
            title: 'Backend Development',
            items: ['Node.js', 'Express', 'Spring Boot', 'Django', 'PostgreSQL']
        },
        {
            title: 'Testing & QA',
            items: ['Jest', 'Cypress', 'Selenium', 'JUnit', 'TestNG']
        },
        {
            title: 'DevOps & Tools',
            items: ['Git', 'Docker', 'Jenkins', 'AWS', 'Linux']
        },
        {
            title: 'Mobile Development',
            items: ['React Native', 'Android', 'iOS', 'Flutter']
        }
    ]

    return (
        <section className='aurora-bg -mt-[64px]'>
            <div className='container mx-auto px-4 py-20'>
                <h2 className='text-4xl md:text-5xl text-white text-center mb-12 font-heading animate-slide-up'>
                    Technical Skills
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10'>
                    {skillCategories.map((category, index) => (
                        <SkillCard 
                            key={index}
                            skill={category.title}
                            items={category.items}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}