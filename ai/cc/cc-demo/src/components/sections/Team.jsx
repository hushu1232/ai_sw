import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TEAM_DATA } from '../../data/team';

const TeamWrapper = styled.section`
  padding: 5rem 0;
  background: var(--bg-secondary);
`;

const TeamContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TeamTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TeamSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const TeamCard = styled(motion.div)`
  background: var(--bg-primary);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transform: translateY(-5px);
  }
`;

const TeamAvatar = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const TeamRole = styled.p`
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TeamDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const SkillTag = styled(motion.span)`
  background: var(--gradient-primary);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Team = () => {
  return (
    <TeamWrapper id="团队">
      <TeamContent>
        <TeamTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          核心团队
        </TeamTitle>
        <TeamSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          汇聚行业精英,打造顶尖技术团队
        </TeamSubtitle>
        <TeamGrid>
          {TEAM_DATA.map((member, index) => (
            <TeamCard
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <TeamAvatar>{member.avatar}</TeamAvatar>
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
              <TeamDescription>{member.description}</TeamDescription>
              <Skills>
                {member.skills.map((skill) => (
                  <SkillTag
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </Skills>
            </TeamCard>
          ))}
        </TeamGrid>
      </TeamContent>
    </TeamWrapper>
  );
};

export default Team;