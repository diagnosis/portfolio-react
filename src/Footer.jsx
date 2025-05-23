import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: faGithub,
            url: 'https://github.com/diagnosis'
        },
        {
            name: 'LinkedIn',
            icon: faLinkedin,
            url: 'https://www.linkedin.com/in/safa-demirkan-94663b280/'
        },
        {
            name: 'Instagram',
            icon: faInstagram,
            url: 'https://www.instagram.com/serik_lee'
        }
    ];

    return (
        <footer className="bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-heading text-2xl">Safa Demirkan</span>
                        <p className="text-indigo-100 mt-2">Sr. Software Engineer in Test</p>
                    </div>
                    
                    <div className="flex space-x-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-teal-100 hover:text-purple-300 transform hover:scale-110 transition-all duration-200"
                            >
                                <FontAwesomeIcon icon={link.icon} size="2x" />
                                <span className="sr-only">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 text-center text-indigo-100 text-sm">
                    <p>&copy; {new Date().getFullYear()} Safa Demirkan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;