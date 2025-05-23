import { useState, useEffect, useRef } from 'react'
import { Menu, User, Code2, Briefcase, GraduationCap, Mail } from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [isMenuOpen])

    const getActiveLinkStyle = (path) => {
        const isActive = router.state.location.pathname === path
        return `block rounded-sm px-3 py-2 text-indigo-100 hover:text-purple-300 hover:underline hover:decoration-3 hover:decoration-solid underline-offset-4 transition-all duration-200 md:p-0 ${
            isActive ? 'text-purple-300 underline decoration-3 decoration-solid' : ''
        }`
    }

    const links = [
        { href: '/about', label: 'About', icon: User },
        { href: '/skills', label: 'Skills', icon: Code2 },
        { href: '/projects', label: 'Projects', icon: Briefcase },
        { href: '/study-projects', label: 'Study Projects', icon: GraduationCap },
        { href: '/contact', label: 'Contact', icon: Mail },
    ]

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
                    ref={buttonRef}
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
                    ref={menuRef}
                    className={`w-full md:block md:w-auto transition-all duration-600 ease-in-out ${
                        isMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
                    }`}
                    id="navbar-default"
                >
                    <ul className="mt-4 flex flex-col rounded-lg border border-violet-200 bg-transparent p-4 font-sans font-medium md:mt-0 md:flex-row md:space-x-4 md:border-0 md:p-0 transform transition-transform duration-200">
                        {links.map((link) => {
                            const Icon = link.icon
                            return (
                                <li key={link.href}>
                                    <Link 
                                        to={link.href} 
                                        className={getActiveLinkStyle(link.href) + ' flex items-center justify-center gap-1.5'}
                                        onClick={() => setIsMenuOpen(false)}
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