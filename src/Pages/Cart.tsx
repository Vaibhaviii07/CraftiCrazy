// src/pages/Cart.tsx
import React from "react";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../AuthContext/CartContext"; // ✅ Import useCart

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      {/* Left: Cart Items */}
      <div className="md:col-span-2 space-y-5">
        <h1 className="text-3xl font-bold text-amber-600 mb-6">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow-md">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity + Remove */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-3 text-red-500 hover:bg-red-100 p-2 rounded-full transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Summary */}
      {cart.length > 0 && (
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-3">
            <span>Total</span>
            <span className="text-amber-600">₹{total}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-6">
            <button className="bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600 transition cursor-pointer">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              Clear Cart
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 py-2 text-sm text-pink-600 hover:underline"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
