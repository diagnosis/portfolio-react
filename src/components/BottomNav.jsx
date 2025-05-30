import { Link, useRouter } from '@tanstack/react-router';
import { Home, User, Code2, Briefcase, GraduationCap } from 'lucide-react';

export function BottomNav() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/about', icon: User, label: 'About' },
        { path: '/skills', icon: Code2, label: 'Skills' },
        { path: '/projects', icon: Briefcase, label: 'Projects' },
        { path: '/study-projects', icon: GraduationCap, label: 'Study' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 py-2 px-4 z-50">
            <div className="flex justify-around items-center">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center transition-all duration-200 ${
                                isActive 
                                    ? 'text-white font-bold scale-110' 
                                    : 'text-indigo-200 hover:text-white'
                            }`}
                        >
                            <Icon size={20} className={isActive ? 'stroke-2' : 'stroke-1'} />
                            <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}