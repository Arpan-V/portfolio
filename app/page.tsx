import Hero from "./Hero";
import About from "./About2";
import Projects from "./Projects";
import Contact from "./Contact2";
import Skills from "./Skills";
import Certificates from "./Certificates";

export default function Home() {
  return (
    <>  
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}