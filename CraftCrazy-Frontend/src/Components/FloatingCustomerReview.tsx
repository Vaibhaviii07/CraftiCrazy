// src/Components/FloatingReviewChat.tsx
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Image as ImageIcon } from "lucide-react";
import { Review } from "./CustomerReview";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../AuthContext/AuthContext";

interface FloatingReviewChatProps {
  productId: string;
}

const FloatingReviewChat: React.FC<FloatingReviewChatProps> = ({ productId }) => {
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your Review Assistant." },
    { sender: "bot", text: "Would you like to share your experience? (yes/no)" },
  ]);

  const [review, setReview] = useState<Review>({
    name: "",
    email: "",
    title: "",
    comment: "",
    rating: 0,
    image: "",
    date: new Date().toISOString(),
    productId,
  });

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // CUSTOM TOAST
  const [customToast, setCustomToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setCustomToast(msg);
    setTimeout(() => setCustomToast(null), 2000);
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    // Authentication check
    if (!isAuthenticated) {
      showToast("Please login to submit a review.");
      setIsOpen(false);
      return;
    }

    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    setTimeout(() => handleBotFlow(userText.toLowerCase()), 400);
  };

  const handleBotFlow = (userText: string) => {
    switch (step) {
      case 0:
        if (userText === "yes") {
          setMessages((prev) => [...prev, { sender: "bot", text: "Awesome! What’s your name?" }]);
          setStep(1);
        } else if (userText === "no") {
          setMessages((prev) => [...prev, { sender: "bot", text: "No worries! Have a nice day 💛" }]);
          setTimeout(() => setIsOpen(false), 1000);
        } else {
          setMessages((prev) => [...prev, { sender: "bot", text: "Please type 'yes' or 'no'." }]);
        }
        break;

      case 1:
        setReview((r) => ({ ...r, name: userText }));
        setMessages((p) => [...p, { sender: "bot", text: `Nice to meet you, ${userText}! What’s your email?` }]);
        setStep(2);
        break;

      case 2:
        setReview((r) => ({ ...r, email: userText }));
        setMessages((p) => [...p, { sender: "bot", text: "Give your review a short title:" }]);
        setStep(3);
        break;

      case 3:
        setReview((r) => ({ ...r, title: userText }));
        setMessages((p) => [...p, { sender: "bot", text: "Now, write your review:" }]);
        setStep(4);
        break;

      case 4:
        setReview((r) => ({ ...r, comment: userText }));
        setMessages((p) => [...p, { sender: "bot", text: "How would you rate it? (1–5)" }]);
        setStep(5);
        break;

      case 5:
        const rating = parseInt(userText);
        if (isNaN(rating) || rating < 1 || rating > 5) {
          setMessages((p) => [...p, { sender: "bot", text: "Please enter a number between 1 and 5." }]);
          return;
        }

        setReview((r) => ({ ...r, rating }));
        setMessages((p) => [
          ...p,
          { sender: "bot", text: `You rated: ${"⭐".repeat(rating)} (${rating}/5)` },
          { sender: "bot", text: "Optionally upload an image and type 'submit' when ready." },
        ]);
        setStep(6);
        break;

      case 6:
        if (userText === "submit") {
          const stored = localStorage.getItem(`reviews_${productId}`);
          const existing = stored ? JSON.parse(stored) : [];
          const updated = [...existing, review];

          localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("new-review", { detail: productId }));

          setMessages((p) => [
            ...p,
            { sender: "bot", text: "✅ Thank you! Your review has been submitted." },
          ]);

          setStep(7);
        } else {
          setMessages((p) => [...p, { sender: "bot", text: "Type 'submit' when you're ready." }]);
        }
        break;

      default:
        break;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setReview((r) => ({ ...r, image: reader.result as string }));
      setMessages((p) => [...p, { sender: "user", text: "📸 Image uploaded successfully!" }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => {
          if (!isAuthenticated) {
            showToast("Please login to submit a review.");
            return;
          }
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 cursor-pointer bg-gradient-to-br from-[#b46029] to-[#e8b77b] text-white rounded-full p-4 shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 right-6 w-80 bg-white border border-gray-200 shadow-xl rounded-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-gray-100 text-gray-800 p-3 font-semibold text-center rounded-t-2xl">
              🧡 Review Assistant
            </div>

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-3 space-y-2 max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl max-w-[80%] break-words ${
                    msg.sender === "bot"
                      ? "bg-gray-100 text-gray-800 self-start"
                      : "bg-[#b46029] text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {review.image && (
                <img
                  src={review.image}
                  alt="Uploaded"
                  className="w-28 h-28 object-cover rounded-xl mt-2 border self-end"
                />
              )}
            </div>

            <div className="flex items-center gap-2 border-t p-2">
              <label className="cursor-pointer">
                <ImageIcon className="text-gray-400 hover:text-gray-600 transition-colors" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-[#b46029] focus:border-[#b46029]"
              />

              <button
                onClick={handleSend}
                className="bg-[#b46029] hover:bg-[#e8b77b] text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Toast */}
      <AnimatePresence>
        {customToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg z-[9999]"
          >
            {customToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingReviewChat;
