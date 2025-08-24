import BestSeller from "../Components/BestSellers";
import GiftCollections from "../Components/GiftCollections.jsx";
import HomePage from "../Components/HomePage";
import TestimonialsPage from "../Components/TestimonialPage.jsx";
import ParallaxSection from "../Components/ParallaxSection.jsx";
import WatchShop from "../Components/watchShop";

const HeroPage = () => {
  return (
    <>
      <HomePage />
      <WatchShop />
      {/* <BestSeller /> */}
      <GiftCollections />
       <ParallaxSection />
      <TestimonialsPage />
    </>
  );
};

export default HeroPage;
