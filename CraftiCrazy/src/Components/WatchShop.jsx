import React from "react";

const products = [
  {
    id: 1,
    name: "Handmade Photo Frame",
    image: "/PhotoFrame.jpeg",
    description: "Beautifully handcrafted frame for your memories.",
  },
  {
    id: 2,
    name: "Engagement Ring Tray",
    image: "/EngagementRingTray.jpeg",
    description: "Elegant tray designed to make your special day magical.",
  },
  {
    id: 3,
    name: "Gift Hamper",
    image: "/giftHamper.jpeg",
    description: "Thoughtfully curated hampers for every celebration.",
  },
  {
    id: 4,
    name: "Magical Gift Box",
    image: "/GiftBox1.jpeg",
    description: "A surprise box filled with love & creativity.",
  },
  {
    id: 5,
    name: "Decorative Craft Item",
    image: "/decorativeIteam.jpeg",
    description: "Unique handmade decor to brighten your home & events.",
  },
  {
    id: 6,
    name: "Resin Keychain",
    image: "/keyChain.jpeg",
    description: "Stylish handmade resin keychains – perfect for gifting or personal use.",
  },
];

const WatchShop = () => {
  return (
    <div className="min-h-screen bg-[#FBFAF7] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#AB420A] mb-10 flex items-center justify-center gap-3">
          Handmade Wonders That Speak Stories
          <img
            className="w-40 h-30 object-contain"
            src="/wonderLogo2.png"
            alt="Handmade Wonders Logo"
          />
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform hover:scale-105 duration-300 max-w-xs w-full"
            >
              {/* Image */}
              <div className="h-44 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-md text-[#AB420A] text-center">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs text-center mt-1">
                  {product.description}
                </p>
                <div className="flex justify-center mt-3">
                  <button className="px-3 py-1.5 bg-[#AB420A] text-white text-sm rounded-md shadow hover:bg-[#F3732F] transition-colors cursor-pointer">
                    Explore ✨
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchShop;
