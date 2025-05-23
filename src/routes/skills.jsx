import { createFileRoute } from '@tanstack/react-router'
import { SkillCard } from '../components/SkillCard.jsx'
import { useEffect } from 'react'
import { faJs, faPython, faJava, faSwift, faReact, faVuejs, faNodeJs, faAws, faDocker, faAndroid, faApple } from '@fortawesome/free-brands-svg-icons'
import { faCode, faDatabase, faVial, faCloud, faMobile } from '@fortawesome/free-solid-svg-icons'
import { createCometAnimation } from '../utils/createCometAnimation';

export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
    useEffect(() => {
        return createCometAnimation('cometCanvas');
    }, []);

    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: faCode,
            items: [
                { name: 'JavaScript', icon: faJs },
                { name: 'TypeScript', icon: faCode },
                { name: 'Java', icon: faJava },
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
                { name: 'PostgreSQL', icon: faDatabase },
                { name: 'MongoDB', icon: faDatabase }
            ]
        },
        {
            title: 'Testing & QA',
            icon: faVial,
            items: [
                { name: 'Selenium', icon: faCode },
                { name: 'Appium', icon: faCode },
                { name: 'Playwright', icon: faCode },
                { name: 'WebdriverIO', icon: faCode },
                { name: 'Jest', icon: faCode },
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
        <section className='aurora-bg pt-10'>
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