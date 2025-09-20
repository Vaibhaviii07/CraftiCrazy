import React from "react";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold">₹{Number(item.price) * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
