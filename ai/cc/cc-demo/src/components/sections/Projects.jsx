import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PROJECTS_DATA } from '../../data/projects';

const ProjectsWrapper = styled.section`
  padding: 5rem 0;
  background: var(--bg-primary);
`;

const ProjectsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProjectsTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectsSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transform: translateY(-5px);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  margin: 0;
`;

const ProjectStatus = styled.span`
  background: ${props =>
    props.status === '已完成'
      ? 'var(--accent-color)'
      : 'var(--secondary-color)'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled(motion.span)`
  background: rgba(99, 102, 241, 0.2);
  color: var(--accent-color);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ProjectImpact = styled.div`
  background: rgba(6, 182, 212, 0.1);
  border-left: 3px solid var(--accent-color);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ImpactText = styled.p`
  color: var(--text-primary);
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ImpactIcon = styled.span`
  font-size: 1.2rem;
`;

const Projects = () => {
  return (
    <ProjectsWrapper id="项目">
      <ProjectsContent>
        <ProjectsTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          项目案例
        </ProjectsTitle>
        <ProjectsSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          用技术创造价值,用实力证明专业
        </ProjectsSubtitle>
        <ProjectsGrid>
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectStatus status={project.status}>
                  {project.status}
                </ProjectStatus>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map((tech) => (
                  <TechTag
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              <ProjectImpact>
                <ImpactText>
                  <ImpactIcon>📊</ImpactIcon>
                  {project.impact}
                </ImpactText>
              </ProjectImpact>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsWrapper>
  );
};

export default Projects;