import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { toast } from "react-toastify";

export default function Checkout({ cart, clearCart }) {

  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const [card, setCard] = useState("");
  const [upi, setUpi] = useState("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  useEffect(() => {

    const login = localStorage.getItem("userLogin");

    if (login !== "true") {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!cart.length) {
      navigate("/");
    }

  }, [cart, navigate]);

  const placeOrder = (e) => {

    e.preventDefault();

    if (!cart.length) return alert("Cart empty");

    if (method === "card" && !card) return alert("Enter card details");

    if (method === "upi" && !upi) return alert("Enter UPI ID");

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      let oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // 🔥 keep only last 20 orders to prevent storage overflow
      if (oldOrders.length > 20) {
        oldOrders = oldOrders.slice(-20);
      }

      const newOrder = {
        id: Date.now(),
        userEmail: user?.email,
        userName: user?.name,
        items: cart.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty
        })), // store minimal data
        amount: total,
        paymentMethod: method,
        status: "Placed",
        date: new Date().toLocaleString()
      };

      const updatedOrders = [...oldOrders, newOrder];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      localStorage.setItem("lastOrder", JSON.stringify(newOrder));

      clearCart();

      toast.success("Order placed successfully");

      navigate("/receipt");

    } catch (error) {

      console.error(error);

      toast.error("Storage full. Clearing old orders.");

      localStorage.removeItem("orders");

      localStorage.setItem("orders", JSON.stringify([]));

    }

  };

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <form onSubmit={placeOrder} className="checkout-form">

        <input placeholder="Full Name" required />
        <input placeholder="Address" required />
        <input placeholder="Mobile Number" required />

        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash On Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Card
        </label>

        <label>
          <input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          UPI
        </label>

        {method === "card" && (
          <input
            placeholder="Card Number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        )}

        {method === "upi" && (
          <input
            placeholder="UPI ID"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />
        )}

        <div className="summary">

          <h3>Order Summary</h3>

          {cart.map(i => (
            <p key={i.id}>
              {i.name} × {i.qty}
              <span> ₹{i.price * i.qty}</span>
            </p>
          ))}

          <h3>Total ₹{total}</h3>

        </div>

        <button className="place-btn">Place Order</button>

      </form>

    </div>
  );
}