import BestSeller from "../Components/BestSellers.js";
import GiftCollections from "../Components/GiftCollections.js";
import HomePage from "../Components/HomePage.js";
import TestimonialsPage from "../Components/TestimonialPage.js";
import ParallaxSection from "../Components/ParallaxSection.js";
import WatchShop from "../Components/WatchShop.js";
import AboutUs from "../Components/AboutUs.js";
const HeroPage = () => {
  return (
    <>
      <HomePage />
      <WatchShop />
      {/* <BestSeller /> */}
      <GiftCollections />
       <ParallaxSection />
      <TestimonialsPage />
      {/* <AboutUs/> */}
    </>
  );
};

export default HeroPage;
