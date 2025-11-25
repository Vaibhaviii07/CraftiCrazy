// src/Components/FloatingCustomerReview.tsx
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../AuthContext/AuthContext";

// ✅ Review type
export interface Review {
  _id?: string;
  name: string;
  email?: string;
  title?: string;
  comment: string;
  rating: number;
  image?: string;
  date: string;
}

// ✅ LocalReview = Review + productId + optional variantId
interface LocalReview extends Review {
  productId: string;
  variantId?: string;
}

interface FloatingCustomerReviewProps {
  productId: string;
  variantId?: string;
  onReviewSubmitted?: () => void; // callback after submission
}

const FloatingCustomerReview: React.FC<FloatingCustomerReviewProps> = ({
  productId,
  variantId,
  onReviewSubmitted,
}) => {
  const { isAuthenticated, user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your Review Assistant." },
    { sender: "bot", text: "Would you like to share your experience? (yes/no)" },
  ]);

  const [review, setReview] = useState<LocalReview>({
    productId,
    variantId,
    name: user?.name || "",
    email: user?.email || "",
    title: "",
    comment: "",
    rating: 0,
    image: "",
    date: new Date().toISOString(),
  });

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [customToast, setCustomToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setCustomToast(msg);
    setTimeout(() => setCustomToast(null), 2000);
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Submit review
  const submitReviewToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review.");

      showToast("🎉 Thank you! Your review is submitted.");

      if (onReviewSubmitted) onReviewSubmitted();

      setStep(7);
    } catch (error) {
      console.error(error);
      showToast("❌ Something went wrong.");
    }
  };

  const handleSend = () => {
    if (!isAuthenticated) {
      showToast("Please login to submit a review.");
      setIsOpen(false);
      return;
    }

    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    setTimeout(() => handleBotFlow(userText.toLowerCase()), 300);
  };

  const handleBotFlow = async (text: string) => {
    switch (step) {
      case 0:
        if (text === "yes") {
          setMessages((p) => [...p, { sender: "bot", text: "Great! What's your name?" }]);
          setStep(1);
        } else if (text === "no") {
          setMessages((p) => [...p, { sender: "bot", text: "No problem! Have a great day 💛" }]);
          setTimeout(() => setIsOpen(false), 1000);
        } else {
          setMessages((p) => [...p, { sender: "bot", text: "Please type 'yes' or 'no'." }]);
        }
        break;

      case 1:
        setReview((r) => ({ ...r, name: text }));
        setMessages((p) => [...p, { sender: "bot", text: "Nice! What's your email?" }]);
        setStep(2);
        break;

      case 2:
        setReview((r) => ({ ...r, email: text }));
        setMessages((p) => [...p, { sender: "bot", text: "Give your review a short title:" }]);
        setStep(3);
        break;

      case 3:
        setReview((r) => ({ ...r, title: text }));
        setMessages((p) => [...p, { sender: "bot", text: "Now type your full review:" }]);
        setStep(4);
        break;

      case 4:
        setReview((r) => ({ ...r, comment: text }));
        setMessages((p) => [...p, { sender: "bot", text: "Rate your experience (1–5):" }]);
        setStep(5);
        break;

      case 5:
        const rating = Number(text);
        if (rating < 1 || rating > 5 || isNaN(rating)) {
          setMessages((p) => [...p, { sender: "bot", text: "Please enter a number between 1 and 5." }]);
          return;
        }

        setReview((r) => ({ ...r, rating }));
        setMessages((p) => [
          ...p,
          { sender: "bot", text: `You rated: ${"⭐".repeat(rating)}` },
          { sender: "bot", text: "You can upload an image now or type 'submit'." },
        ]);
        setStep(6);
        break;

      case 6:
        if (text === "submit") {
          await submitReviewToBackend();
        } else {
          setMessages((p) => [...p, { sender: "bot", text: "Type 'submit' when ready." }]);
        }
        break;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setReview((r) => ({ ...r, image: reader.result as string }));
      setMessages((p) => [...p, { sender: "user", text: "📸 Image uploaded!" }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <motion.button
        onClick={() => {
          if (!isAuthenticated) {
            showToast("Please login to submit a review.");
            return;
          }
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 bg-[#b46029] text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: isAuthenticated ? 1.1 : 1 }}
        whileTap={{ scale: isAuthenticated ? 0.9 : 1 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 right-6 w-80 bg-white border shadow-xl rounded-2xl overflow-hidden z-50"
          >
            <div className="bg-gray-100 p-3 text-center font-semibold">🧡 Review Assistant</div>

            <div ref={chatRef} className="p-3 max-h-96 overflow-y-auto space-y-2 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-black"
                      : "bg-[#b46029] text-white ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {review.image && <img src={review.image} className="w-24 h-24 rounded-lg ml-auto" />}
            </div>

            <div className="flex items-center gap-2 p-2 border-t">
              <label>
                <ImageIcon className="text-gray-500 cursor-pointer" />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type..."
                className="flex-1 border rounded-lg px-2 py-1 text-sm"
                disabled={!isAuthenticated}
              />

              <button
                onClick={handleSend}
                className="bg-[#b46029] text-white px-3 py-2 rounded-lg"
                disabled={!isAuthenticated}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {customToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D4B7] px-6 py-3 rounded-lg shadow-lg"
          >
            {customToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCustomerReview;
