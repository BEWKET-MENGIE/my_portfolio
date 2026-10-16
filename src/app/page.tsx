import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Services from "@/components/services/Services";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Contact from "@/components/contact/Contact";
export default function Home() {
  return (
    <main className="min-h-screen bg-(--dark,#09090b) text-(--text,#f3f4f6)">
      <Hero />
      <About />
       <Services />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}