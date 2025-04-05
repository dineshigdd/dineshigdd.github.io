import { 
  siReact, siRedux, siNodedotjs, siMongodb, siExpress, 
  siNextdotjs, siBootstrap, siTailwindcss, 
  siAmazonwebservices
} from "simple-icons";
import styled from 'styled-components'

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
      <SkilContainer>  
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
      </SkilContainer>  
  );
};

export default Skills;

const SkilContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* row-gap: 20px; */
    max-width: 900px;


    @media (min-width: 576px) {
      gap: 40px;
      width: 900px;
    }
`
