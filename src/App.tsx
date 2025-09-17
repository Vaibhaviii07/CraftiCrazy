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
