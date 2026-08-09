function Projects({Projects}){
    return(
        <section className="section-container">
            <h1> Projects </h1>
            {Projects.map((project) => (
                <div key="Project.id" className="project-card" >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </section>
    )
}export default Projects