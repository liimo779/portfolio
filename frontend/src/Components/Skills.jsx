 function Skills({ skills }) {
  return (
    <div>
      {skills.map((skill) => (
        <div key={skill.id}>
          {skill.name}
        </div>
      ))}
    </div>
  );
}

export default Skills;