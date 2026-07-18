import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import WhyChooseMe from "../components/WhyChooseMe";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhyChooseMe />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;