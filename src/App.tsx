import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import HeroPage from "./Pages/HeroPage";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import CustomerDemand from "./Pages/CustomerDemand";
import NewArrivals from "./Components/NewArrival";
import BirthdayHamperPage from "./Pages/CustomizedHamper/BirthdayHamper"
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import ParallaxSection from "./Components/ParallaxSection.js";
import LoginPromptModal from "./Components/LoginPromptModal"; //  Import modal

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeddingHamper from "./Pages/CustomizedHamper/WeddingHamper";
import CorporateHamper from "./Pages/CustomizedHamper/CorporateHamper.js";
import WoodenPhotoFrames from "./Pages/PhotoFrames/WoodenFrame.js";
import GlassPhotoFrames from "./Pages/PhotoFrames/GlassFrame.js";
import ResinPhotoFrames from "./Pages/PhotoFrames/ResinFrame.js";
import WomenAccessories from "./Pages/Accessories/WomenAccessories.js";
import KeyChainPage from "./Pages/Accessories/KeyChain.js";
import WalletPage from "./Pages/Accessories/WalletPage.js";
import BraceletPage from "./Pages/Accessories/BraceletPage.js";
import ToteBagPage from "./Pages/Accessories/ToteBagPage.js";

function App() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    if (!isLoggedIn) {
      // Show login popup after 1 second of visiting
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HeroPage />} />

        {/* About Us */}
        <Route path="/aboutus" element={<AboutUs />} />

        {/* New Arrivals */}
        <Route path="/newarrivals" element={<NewArrivals />} />

        {/* Customer Demand */}
        <Route path="/customerdemand" element={<CustomerDemand />} />

        <Route path="/BirthdayHamper" element={<BirthdayHamperPage />}/>
        <Route path="/wedding" element={<WeddingHamper />} />
        <Route path="/corporate" element={<CorporateHamper />} />
        <Route path="/wooden" element={<WoodenPhotoFrames/>}/>
        <Route path="/glass" element={<GlassPhotoFrames/>} />
        <Route path="/resin" element={<ResinPhotoFrames/>} />
        <Route path="/womenAss" element={<WomenAccessories />}/>
        <Route path="/keychain" element={<KeyChainPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/bracelet" element={<BraceletPage />} />
        <Route path="/tote" element={<ToteBagPage />} />
        {/* Contact Us */}
        <Route path="/contactus" element={<ContactUs />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ParallaxSection />
      <Footer />

      {/* 🔑 Show login prompt if not logged in */}
      {showPrompt && !isLoggedIn && (
        <LoginPromptModal onClose={() => setShowPrompt(false)} />
      )}
    </Router>
  );
}

export default App;
