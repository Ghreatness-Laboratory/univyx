import AboutUs from "../components/layouts/homepage/AboutUs";
import FAQ from "../components/layouts/homepage/FAQ";
import Features from "../components/layouts/homepage/Features";
import Hero from "../components/layouts/homepage/Hero";
import Services from "../components/layouts/homepage/Services";
import Team from "../components/layouts/homepage/Team";
import WhyChooseUs from "../components/layouts/homepage/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Team />
      <Features />
      <FAQ />
    </main>
  );
}
