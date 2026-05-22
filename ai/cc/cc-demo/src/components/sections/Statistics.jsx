import { motion } from 'framer-motion';
import styled from 'styled-components';
import { STATISTICS_DATA } from '../../data/statistics';
import { useCountUp } from '../../hooks/useCountUp';

const StatisticsWrapper = styled.section`
  padding: 5rem 0;
  background: var(--gradient-secondary);
  min-height: 80vh;
  display: flex;
  align-items: center;
`;

const StatisticsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatisticsTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
`;

const StatisticsSubtitle = styled(motion.p)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  font-size: 1.1rem;
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(-8px);
  }
`;

const StatIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const StatSuffix = styled.span`
  font-size: 1.5rem;
  color: var(--accent-color);
`;

const StatLabel = styled.h3`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const StatDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

const Statistics = () => {
  return (
    <StatisticsWrapper id="数据">
      <StatisticsContent>
        <StatisticsTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          就业数据
        </StatisticsTitle>
        <StatisticsSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          用数据说话,用结果证明
        </StatisticsSubtitle>
        <StatisticsGrid>
          {STATISTICS_DATA.map((stat, index) => (
            <StatCard
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <CounterDisplay targetValue={stat.value} suffix={stat.suffix} />
              <StatLabel>{stat.label}</StatLabel>
              <StatDescription>{stat.description}</StatDescription>
            </StatCard>
          ))}
        </StatisticsGrid>
      </StatisticsContent>
    </StatisticsWrapper>
  );
};

const CounterDisplay = ({ targetValue, suffix }) => {
  const { count, ref } = useCountUp(targetValue);

  return (
    <StatValue ref={ref}>
      {count}
      {suffix && <StatSuffix>{suffix}</StatSuffix>}
    </StatValue>
  );
};

export default Statistics;