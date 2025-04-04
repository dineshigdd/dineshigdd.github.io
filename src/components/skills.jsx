import { 
  siReact, siRedux, siNodedotjs, siMongodb, siExpress, 
  siNextdotjs, siBootstrap, siTailwindcss, 
  siAmazonwebservices
} from "simple-icons";

const skills = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Redux", icon: siRedux },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "MongoDB", icon: siMongodb }, 
  { name : "AWS", icon:siAmazonwebservices }
];

const Skills = () => {
  return (
    <div style={{ textAlign: "center" }}>     
      <div style={{ display: "flex", gap:"40px", flexWrap: "wrap", justifyContent: "center", width:"900px"}}>
        {skills.map((skill) => (
          <div key={skill.name} style={{ 
            flex: "1 1 30%",  // Ensures 3 items per row (100% / 3 ≈ 30%)
            textAlign: "center" 
            }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill={skill.icon.hex ? `#${skill.icon.hex}` : "black"}>
              <path d={skill.icon.path} />
            </svg>
            <p style={{ fontSize: "14px" }}>{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
