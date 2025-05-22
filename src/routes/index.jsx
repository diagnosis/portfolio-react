import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <section className="bg-gradient-to-br from-fuchsia-700 via-purple-700 to-blue-700 min-h-screen">
            <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center opacity-10 animate-fade-in"></div>
            <div className='px-4 mx-auto flex max-w-screen-xl flex-wrap items-center min-h-screen'>
                <div className="mx-auto flex flex-col items-left relative z-10 bg-white/5 backdrop-blur-sm p-8 rounded-lg">
                    <p className="font-sans text-5xl text-indigo-100 animate-slide-up">
                        I am,
                    </p>
                    <h1 className="font-heading text-7xl text-white text-shadow-custom mt-2 animate-bounce-in">
                        Safa Demirkan
                    </h1>
                    <p className="font-sans text-4xl text-indigo-100 mt-4 animate-slide-up">
                        Sr. Software Engineer in Test and Creative Developer
                    </p>
                    <details className="mt-4 text-indigo-100 animate-fade-in">
                        <summary className="cursor-pointer hover:text-purple-300 transition-colors duration-200">
                            Details
                        </summary>
                        <div className="bg-white/10 backdrop-blur-sm text-indigo-100 p-4 rounded-lg mt-2 shadow-xl">
                            This is a secret.
                        </div>
                    </details>
                    <Link
                        to="/contact"
                        className="block self-center w-fit mt-6 bg-gradient-to-r from-blue-500 via-purple-700 to-indigo-500 text-white hover:text-purple-300 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-200 animate-fade-in shadow-lg hover:shadow-xl"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}