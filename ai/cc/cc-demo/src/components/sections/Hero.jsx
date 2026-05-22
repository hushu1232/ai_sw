import { motion } from 'framer-motion';
import styled from 'styled-components';
import clsx from 'clsx';

const HeroWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-color);
  border-radius: 50%;
  opacity: 0.5;
  box-shadow: 0 0 10px var(--accent-color);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  pointer-events: none;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 10;
  padding: 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
  }
`;

const Hero = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  const scrollToContact = () => {
    const contactSection = document.getElementById('联系');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroWrapper id="首页">
      <GradientOverlay />
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          initial={{ x: `${particle.x}%`, y: `${particle.y}%` }}
          animate={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          吉马程序员
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          用技术改变世界,让代码更有价值
        </HeroSubtitle>
        <CTAButton
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
        >
          了解更多
        </CTAButton>
      </HeroContent>
    </HeroWrapper>
  );
};

export default Hero;