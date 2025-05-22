import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <section className="bg-gradient-to-br from-fuchsia-700 via-purple-700 to-blue-700 min-h-screen">
            <div className='px-4 mx-auto flex max-w-screen-xl flex-wrap items-center min-h-screen '>
                <div className="card mx-auto flex flex-col items-left relative z-10 shadow-2xl">
                    <p className="font-sans text-5xl text-indigo-100">I am,</p>
                    <h1 className="font-heading text-7xl text-white text-shadow-custom mt-2">Safa Demirkan</h1>
                    <p className="font-sans text-4xl text-indigo-100 mt-4">
                        Sr. Software Engineer in Test and Creative Developer
                    </p>
                    <details className="mt-4 text-indigo-100">
                        <summary className="cursor-pointer">Details</summary>
                        <div className="bg-gray-100 text-gray-800 p-2 rounded mt-2">
                            This is a secret.
                        </div>
                    </details>
                    <Link
                        to="/contact"
                        className="block self-center w-fit mt-6 bg-gradient-to-r from-blue-500 via-purple-700 to-indigo-500 text-white hover:text-purple-300 px-6 py-3 rounded-lg hover:bg-amber-50 hover:scale-105 transition-all duration-200"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}