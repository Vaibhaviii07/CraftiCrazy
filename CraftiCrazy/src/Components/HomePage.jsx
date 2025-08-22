import React from "react";

const HomePage = () => {
  return (
    <div className="bg-white ">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./hero.jpeg')" }}
        ></div>
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-xl text-center border border-white/20">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Handmade Gifts That Speak from the Heart
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-serif">
              Explore our unique collection of hampers, frames, accessories, and more.
            </p>
            <a
              href="#categories"
              className="inline-block px-8 py-4 bg-[#AB420A] hover:bg-[#F3732F] rounded-full text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
