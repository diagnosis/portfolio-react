import {useEffect, useState} from 'react'
import { Menu, User, UserCircle, Code2, Code2Icon, Briefcase, BriefcaseIcon, GraduationCap, School2Icon, Mail, MailIcon } from 'lucide-react'
import {Link, useRouter} from '@tanstack/react-router'

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    
    const linkStyle =
        'block rounded-sm px-3 py-2 text-indigo-100 hover:text-purple-300 hover:underline hover:decoration-purple-300 hover:decoration-4 hover:decoration-solid underline-offset-4 transition-all duration-200 md:p-0'

    const links = [
        { href: '/about', label: 'About', icon: User, filledIcon: UserCircle },
        { href: '/skills', label: 'Skills', icon: Code2, filledIcon: Code2Icon },
        { href: '/projects', label: 'Projects', icon: Briefcase, filledIcon: BriefcaseIcon },
        { href: '/study-projects', label: 'Study Projects', icon: GraduationCap, filledIcon: School2Icon },
        { href: '/contact', label: 'Contact', icon: Mail, filledIcon: MailIcon },
    ]

    const handleLinkClick = async (e) => {
        setIsMenuOpen(false)
        
        // Wait for the next tick to ensure router state is updated
        await new Promise(resolve => setTimeout(resolve, 0))
        
        // Find all links and remove active styles
        const links = document.querySelectorAll('a')
        links.forEach(link => {
            link.classList.remove('underline')
            link.classList.remove('text-purple-300')
            link.classList.remove('decoration-purple-300')
            link.classList.remove('decoration-4')
        })
        
        // Add active styles to clicked link
        if (e.target.classList.contains('active')) {
            e.target.classList.add('underline')
            e.target.classList.add('text-purple-300')
            e.target.classList.add('decoration-purple-300')
            e.target.classList.add('decoration-4')
        }
    }

    // Set initial active link on mount
    useEffect(() => {
        const currentPath = router.state.location.pathname
        const activeLink = document.querySelector(`a[href="${currentPath}"]`)
        if (activeLink) {
            activeLink.classList.add('underline')
            activeLink.classList.add('text-purple-300')
            activeLink.classList.add('decoration-purple-300')
            activeLink.classList.add('decoration-4')
        }
    }, [])

    return (
        <nav className="bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 fixed w-full top-0 z-50">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm">
                        <span className="text-xl font-bold text-white">SD</span>
                    </div>
                    <span className="font-heading self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-purple-300 text-shadow-custom hover:scale-105 transition-all duration-200">
                        Safa Demirkan
                    </span>
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="ml-auto mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-violet-300 hover:bg-purple-600 focus:ring-2 focus:ring-violet-300 focus:outline-none md:hidden transition-colors duration-200"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <Menu size={24} className={`transform transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} />
                </button>

                <div
                    className={`w-full md:block md:w-auto transition-all duration-600 ease-in-out ${
                        isMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
                    }`}
                    id="navbar-default"
                >
                    <ul className="mt-4 flex flex-col rounded-lg border border-violet-200 bg-transparent p-4 font-sans font-medium md:mt-0 md:flex-row md:space-x-4 md:border-0 md:p-0 transform transition-transform duration-200">
                        {links.map((link) => {
                            const isActive = router.state.location.pathname === link.href
                            const Icon = isActive ? link.filledIcon : link.icon
                            return (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className={linkStyle + ' flex items-center justify-center gap-1.5'}
                                        onClick={handleLinkClick}
                                    >
                                        <Icon size={18} />
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}