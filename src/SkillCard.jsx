import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SkillCard = ({skill, icon, items}) => {
    return (
        <div className='flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-in'>
            <h3 className='text-2xl text-teal-100 mb-4 font-heading flex items-center gap-3'>
                <FontAwesomeIcon icon={icon} className="text-teal-400" />
                {skill}
            </h3>
            <div className='flex-1'>
                <ul className='space-y-2'>
                    {items?.map((item, index) => (
                        <li 
                            key={index}
                            className='text-indigo-100 hover:text-teal-300 transition-colors duration-200 flex items-center gap-2'
                        >
                            <FontAwesomeIcon icon={item.icon} className="text-teal-400 w-4" />
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}