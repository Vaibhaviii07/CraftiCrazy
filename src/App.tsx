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
import Cart from "./Pages/Cart.tsx";
import ParallaxSection from "./Components/ParallaxSection.js";
import LoginPromptModal from "./Components/LoginPromptModal"; //  Import modal

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeddingHamper from "./Pages/CustomizedHamper/WeddingHamper";
import CorporateHamper from "./Pages/CustomizedHamper/CorporateHamper.js";
import WoodenPhotoFrames from "./Pages/PhotoFrames/WoodenFrame.js";
import GlassPhotoFrames from "./Pages/PhotoFrames/GlassFrame.js";
import WomenAccessories from "./Pages/Accessories/WomenAccessories.js";
import KeyChainPage from "./Pages/Accessories/KeyChain.js";
import WalletPage from "./Pages/Accessories/WalletPage.js";
import BraceletPage from "./Pages/Accessories/BraceletPage.js";
import ToteBagPage from "./Pages/Accessories/ToteBagPage.js";
import ResinJewelryPage from "./Pages/ResinArt/ResinJewelarypage.js";
import ResinKeychainPage from "./Pages/ResinArt/ResinKeychainPage.js";
import ResinClockPage from "./Pages/ResinArt/ResinClockpage.js";
import ResinNameplatePage from "./Pages/ResinArt/ResinNameplatePage.js";
import ResinPhotoFramesPage from "./Pages/ResinArt/ResinPhotoFramesPage.js";
import ResinCoasterSetPage from "./Pages/ResinArt/ResinCoasterSetPage.js";
import ResinPujaThalePage from "./Pages/ResinArt/ResinPujaThalePage.js";
import DiwaliHamperPage from "./Pages/Festivel/DiwaliHamperPage.js";
import KeyChainDetails from "./ProductDetails/KeyChainDetails.tsx";
import BraceletDetails from "./ProductDetails/BraceletDetails.tsx";
import ToteBagDetailPage from "./ProductDetails/ToteBagDetailPage.tsx";
import WalletDetailPage from "./ProductDetails/WalletDetailPage.tsx";
import WomenAccessoryDetailPage from "./ProductDetails/WomenAccessoryDetailPage.tsx";
import BirthdayHamperDetails from "./ProductDetails/BirthdayHamperDetails.tsx";
import CorporateHamperDetails from "./ProductDetails/CorporateHamperDetails.tsx";
import GlassFrameDetails from "./ProductDetails/GlassFrameDetails.tsx";
import ResinFrameDetailPage from "./ProductDetails/ResinFrameDetailPage.tsx";
import WoodenFrameDetailPage from "./ProductDetails/WoodenFrameDetailPage.tsx";
import ResinClockDetailPage from "./ProductDetails/ResinClockDetailPage.tsx";
import ResinCoasterDetailPage from "./ProductDetails/ResinCoasterDetailPage.tsx";
import ResinJewelryDetailPage from "./ProductDetails/ResinJewelryPageDetail.tsx";
import ResinKeychainDetailPage from "./ProductDetails/ResinKeychainDetailPage.tsx";
import ResinNameplateDetailPage from "./ProductDetails/ResinNameplateDetailPage.tsx";
import ResinPhotoFrameDetailPage from "./ProductDetails/ResinPhotoFrameDetailPage.tsx";
import ResinPujaThaleDetailPage from "./ProductDetails/ResinPujaThaleDetailPage.tsx";
import WeddingHamperDetailPage from "./ProductDetails/WeddingHamperDetailPage.tsx";
import ResinFramePage from "./Pages/PhotoFrames/ResinFrame.tsx";

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
        <Route path="/resin" element={<ResinFramePage/>} />
        <Route path="/womenAss" element={<WomenAccessories />}/>
        <Route path="/keychain" element={<KeyChainPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/bracelet" element={<BraceletPage />} />
        <Route path="/tote" element={<ToteBagPage />} />
        <Route path="/resinJwell" element ={<ResinJewelryPage/>}/>
        <Route path="/resinKeychain" element ={<ResinKeychainPage/>}/>
        <Route path="/resinclock" element={<ResinClockPage />}/>
        <Route path="/resinNameplate" element ={<ResinNameplatePage/>}/>
        <Route path="/resinframe" element={<ResinPhotoFramesPage/>} />
        <Route path="/resincoasters" element={<ResinCoasterSetPage/>} />
        <Route path="/resinthale" element={<ResinPujaThalePage/>} />
        <Route path="/diwali" element={<DiwaliHamperPage/>} />
        
       {/*Product Details */}
       <Route path="/keydetail/:id" element={<KeyChainDetails/>}/>
       <Route path="/braceletdetail/:id" element={<BraceletDetails/>}/>
       <Route path="/totebagdetail/:id" element={<ToteBagDetailPage/>}/>
       <Route path="/walletdetail/:id" element={<WalletDetailPage/>}/>
       <Route path="/accessorydetail/:id" element={<WomenAccessoryDetailPage/>}/>
       <Route path="/birthdaydetail/:id" element={<BirthdayHamperDetails/>}/>
       <Route path="/corporatedetail/:id" element={<CorporateHamperDetails/>}/>
       <Route path="/weddingDetail/:id" element={<WeddingHamperDetailPage/>}/>
       <Route path="/Glassdetail/:id" element={<GlassFrameDetails/>}/>
       <Route path="/Framedetail/:id" element={<ResinFrameDetailPage/>}/>
       <Route path="/woodendetail/:id" element={<WoodenFrameDetailPage/>}/>
       <Route path="/clockdetail/:id" element={<ResinClockDetailPage/>}/>
       <Route path="/caosterdetail/:id" element={<ResinCoasterDetailPage/>}/>
       <Route path="/jewelarydetail/:id" element={<ResinJewelryDetailPage/>}/>
       <Route path="/keychaindetail/:id" element={<ResinKeychainDetailPage/>}/>
       <Route path="/Nameplatedetail/:id" element={<ResinNameplateDetailPage/>}/>
       <Route path="/photoframedetail/:id" element={<ResinPhotoFrameDetailPage/>}/>
       <Route path="/pujathale/:id" element={<ResinPujaThaleDetailPage/>}/>









       




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
