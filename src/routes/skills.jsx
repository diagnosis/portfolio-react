import { createFileRoute } from '@tanstack/react-router'
import { SkillCard } from '../SkillCard.jsx'
import { useEffect } from 'react'
import { faJs, faPython, faJava, faSwift, faReact, faVuejs, faNodeJs, faAws, faDocker, faAndroid, faApple } from '@fortawesome/free-brands-svg-icons'
import { faCode, faDatabase, faVial, faCloud, faMobile } from '@fortawesome/free-solid-svg-icons'

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
            icon: faCode,
            items: [
                { name: 'JavaScript', icon: faJs },
                { name: 'TypeScript', icon: faCode },
                { name: 'Python', icon: faPython },
                { name: 'Java', icon: faJava },
                { name: 'Ruby', icon: faCode },
                { name: 'Swift', icon: faSwift },
                { name: 'Kotlin', icon: faCode }
            ]
        },
        {
            title: 'Frontend Development',
            icon: faCode,
            items: [
                { name: 'React', icon: faReact },
                { name: 'Vue.js', icon: faVuejs },
                { name: 'Next.js', icon: faCode },
                { name: 'Svelte', icon: faCode },
                { name: 'TailwindCSS', icon: faCode },
                { name: 'HTML/CSS', icon: faCode }
            ]
        },
        {
            title: 'Backend Development',
            icon: faDatabase,
            items: [
                { name: 'Node.js', icon: faNodeJs },
                { name: 'Express', icon: faCode },
                { name: 'Ruby on Rails', icon: faCode },
                { name: 'Spring Boot', icon: faCode },
                { name: 'PostgreSQL', icon: faDatabase },
                { name: 'MongoDB', icon: faDatabase }
            ]
        },
        {
            title: 'Testing & QA',
            icon: faVial,
            items: [
                { name: 'Selenium', icon: faCode },
                { name: 'Cypress', icon: faCode },
                { name: 'Playwright', icon: faCode },
                { name: 'WebdriverIO', icon: faCode },
                { name: 'Jest', icon: faCode },
                { name: 'Mocha', icon: faCode },
                { name: 'Chai', icon: faCode }
            ]
        },
        {
            title: 'DevOps & Cloud',
            icon: faCloud,
            items: [
                { name: 'AWS', icon: faAws },
                { name: 'Docker', icon: faDocker },
                { name: 'Kubernetes', icon: faCloud },
                { name: 'Jenkins', icon: faCode },
                { name: 'CircleCI', icon: faCode },
                { name: 'GitHub Actions', icon: faCode }
            ]
        },
        {
            title: 'Mobile Development',
            icon: faMobile,
            items: [
                { name: 'React Native', icon: faReact },
                { name: 'Android (Native)', icon: faAndroid },
                { name: 'iOS (Native)', icon: faApple },
                { name: 'Flutter', icon: faMobile }
            ]
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
                            icon={category.icon}
                            items={category.items}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}