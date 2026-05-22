import Header from './components/common/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Team from './components/sections/Team';
import Projects from './components/sections/Projects';
import Statistics from './components/sections/Statistics';
import Contact from './components/sections/Contact';
import Footer from './components/common/Footer';
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Team />
      <Projects />
      <Statistics />
      <Contact />
      <Footer />
    </>
  );
}

export default App;