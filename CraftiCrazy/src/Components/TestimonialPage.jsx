import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    feedback:
      "Absolutely loved the Photo Frame! It made my engagement day so much more special. The packaging and detailing were perfect.",
    location: "Mumbai, India",
    product: "Resin Photo Frame",
    image: "Review1.jpeg",
  },
  {
    id: 2,
    name: "Rohit Mehta",
    feedback:
     "I ordered a handmade gift hamper for my friend, and it was elegant and unique. She absolutely loved it, and everyone admired the craftsmanship. Highly recommended for special occasions.",
    location: "Delhi, India",
    product: "Luxury Gift Hamper",
    image: "Review2.jpeg",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    feedback:
    "I ordered a Raksha Bandhan hamper for my brother, and he absolutely loved it! The hamper was thoughtful and beautifully packed.",
    product: "Customized Keychain",
    image: "Review3.jpeg",
  },
];

export default function TestimonialsPage() {
  return (
    <section className="py-20 bg-gray-100">
     
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#AB420A]">
          What Our Customers Say
        </h2>
        <p className="mt-3 text-lg text-[#6B3F28] max-w-xl mx-auto">
          Hear from those who chose handmade craftsmanship for their big moments.
        </p>
      </div>

     
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          >
           
            <img
              src={t.image}
              alt={t.product}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

           
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.location}</p>
            </div>

            
            <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>

           
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5"
                  fill="currentColor"
                  stroke="none"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
