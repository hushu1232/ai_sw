import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutWrapper = styled.section`
  padding: 5rem 0;
  background: var(--bg-primary);
`;

const AboutContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div``;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AboutDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const MissionCard = styled(motion.div)`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
  }
`;

const MissionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const MissionText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const AboutVisual = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 1rem;
  background: var(--gradient-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VisualText = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
`;

const About = () => {
  return (
    <AboutWrapper id="关于">
      <AboutContent>
        <AboutText>
          <AboutTitle
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            关于我们
          </AboutTitle>
          <AboutDescription
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            吉马程序员是一家专注于技术创新和人才培养的科技公司。我们汇聚了来自全球顶尖企业的优秀工程师,致力于为客户打造高质量、高性能的软件解决方案。
          </AboutDescription>
          <AboutDescription
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            通过持续的技术积累和项目实践,我们帮助大量程序员实现了职业突破,为企业输送了优秀的软件开发人才。
          </AboutDescription>
          <MissionCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <MissionTitle>使命与愿景</MissionTitle>
            <MissionText>
              我们的使命是让每一位程序员都能发挥最大潜能,通过技术创新推动行业发展。我们愿景成为程序员职业发展的最佳伙伴,构建一个充满活力的技术社区。
            </MissionText>
          </MissionCard>
        </AboutText>
        <AboutVisual
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <VisualText>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>创新 · 专业 · 成长</h3>
            <p>让技术改变世界</p>
          </VisualText>
        </AboutVisual>
      </AboutContent>
    </AboutWrapper>
  );
};

export default About;