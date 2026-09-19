import Banner from "../../shared/Banner";
import ExploreSection from "../../homelayout/ExploreSection";
import CtaBanner from "../../shared/CtaBanner";
import Stats from "../../shared/Stats";
import Choose from "../choose/Choose";
import Destination from "../../homelayout/Destination";

export default function About() {
  return (
    <>
      <Banner
        title="About"
        highlightedTitle="Us"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        backgroundImage="/travel/Travel/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg"
      />
      <ExploreSection hideButton />
      <CtaBanner />
      <Stats />
      <Choose hideBanner />
      <Destination/>
    </>
  );
}