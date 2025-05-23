function StudyProjectCard({project}) {
    return (
        <>
            <div className="flex flex-col p-6 h-full bg-black/30 backdrop-blur-sm rounded-lg border border-teal-500/20 hover:scale-[1.02] transition-all duration-300 animate-fade-in">
                <h3 className="text-2xl text-teal-100 mb-4 font-heading">Coming Soon</h3>
                <p className="text-indigo-100">
                    Study projects section is under development. Check back soon for updates!
                </p>
            </div>
        </>
    )
}

export default StudyProjectCard;