



export const SkillCard = ({skill, items}) => {
    return (
        <div className='flex flex-col p-10 w-full h-full bg-violet-500/70 rounded-lg skill-card'>
            <h3 className='text-2xl'>{skill}</h3>
            <div className='flex-1'>
                <ul>
                    {items?.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        </div>
    )
}