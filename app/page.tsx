import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";

export default function Home() {
  return (
    <>  
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
    </>
  );
}