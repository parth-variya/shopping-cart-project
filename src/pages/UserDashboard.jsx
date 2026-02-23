import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {

  const navigate = useNavigate();

  const user = localStorage.getItem("userName") || "Parth";

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalProducts = products.length;
  const cartItems = cart.reduce((t, i) => t + i.qty, 0);
  const totalAmount = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  return (
    <div className="user-dashboard">

      <div className="user-header">
        <h2>User Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>Welcome, {user}</h3>

      <div className="user-stats">

        <div className="user-card">
          <p>Total Products</p>
          <h1>{totalProducts}</h1>
        </div>

        <div className="user-card">
          <p>Cart Items</p>
          <h1>{cartItems}</h1>
        </div>

        <div className="user-card">
          <p>Total Amount</p>
          <h1>₹{totalAmount}</h1>
        </div>

      </div>

      <div className="user-actions">

        <button onClick={() => navigate("/")}>View Products</button>

        <button onClick={() => navigate("/cart")}>View Cart</button>

      </div>

    </div>
  );
} 