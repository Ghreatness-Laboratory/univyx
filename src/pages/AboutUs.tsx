import Company from "../components/layouts/aboutUs/Company";
import OurCoreBeliefs from "../components/layouts/aboutUs/OurCoreBeliefs";
import OurJourney from "../components/layouts/aboutUs/OurJourney";
import Testimonials from "../components/layouts/aboutUs/Testimonials";
import FAQ from "../components/layouts/homepage/FAQ";
import Team from "../components/layouts/homepage/Team";

export default function AboutUs() {
  return (
    <main data-testid="about-us-page">
      <OurJourney />
      <OurCoreBeliefs />
      <Team />
      <Testimonials />
      <Company />
      <FAQ />
    </main>
  );
}
