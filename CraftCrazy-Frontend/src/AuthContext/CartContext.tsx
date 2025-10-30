// src/AuthContext/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customization?: {
    available: boolean;
    userInput: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  updateCartItem: (id: string, updatedItem: CartItem) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();  

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Calculate total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  //  Add item to cart
  const addToCart = async (item: CartItem) => {
  const token = localStorage.getItem("token");

  if (!token && !isAuthenticated) {
  toast.error("Please login to add items to your cart!");
  localStorage.removeItem("token");
  return;
}

    // User logged in — Add or update item
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Optional Sync cart with backend
    // try {
    //   await fetch("http://localhost:5000/api/cart", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(item),
    //   });
    // } catch (error) {
    //   console.error("Cart sync failed:", error);
    // }
  };

  //  Remove item
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  //  Increase quantity
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateCartItem = (id:string, updatedItem: CartItem) => {
      setCart((prev) => (
        prev.map((item) => (
          item.id === id ? updatedItem : item 
        ))
      ))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        cartTotal,
        updateCartItem  

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart anywhere
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
