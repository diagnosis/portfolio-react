import { createFileRoute } from '@tanstack/react-router'
import { SkillCard } from '../SkillCard.jsx'
export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
    return (
        <section className='text-white skills-bg'>
            <div className='grid m-auto max-w-screen-xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 place-items-center relative z-10'>
                <SkillCard skill='Programming Languages' items={['JavaScript', 'Kotlin', 'Java', 'Swift']} />
                <SkillCard skill='Programming Languages' items={['JavaScript', 'Kotlin', 'Java', 'Swift']} />
                <SkillCard skill='Programming Languages' items={['JavaScript', 'Kotlin', 'Java', 'Swift']} />
                <SkillCard skill='Programming Languages' items={['JavaScript', 'Kotlin', 'Java', 'Swift']} />
                <SkillCard skill='React' />
                <SkillCard skill='React' />
            </div>
        </section>
    )
}
