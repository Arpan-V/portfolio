import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About2";
import Projects from "./Projects";
import Stats from "./Stats";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}