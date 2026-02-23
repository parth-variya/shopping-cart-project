import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

export default function OrderHistory() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const login = localStorage.getItem("userLogin");

    if (login !== "true") {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = savedOrders
      .filter(o => o.userEmail === currentUser?.email)
      .reverse();

    setOrders(userOrders);

  }, [navigate]);

  const cancelOrder = (id) => {

    const confirmCancel = window.confirm("Cancel this order?");
    if (!confirmCancel) return;

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map(order =>
      order.id === id
        ? { ...order, status: "Cancelled" }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updated));

    const currentUser = JSON.parse(localStorage.getItem("user"));

    setOrders(
      updated
        .filter(o => o.userEmail === currentUser?.email)
        .reverse()
    );
  };

  if (!orders.length) {
    return <h2 style={{ textAlign: "center" }}>No Orders Found</h2>;
  }

  return (
    <div className="orders-container">

      <h2>My Orders</h2>

      {orders.map(order => (

        <div className="order-card" key={order.id}>

          <div className="order-header">
            <span>Order ID: {order.id}</span>
            <span>{order.date}</span>
          </div>

          {order.items.map(item => (
            <div className="order-item" key={item.id}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <div className="order-footer">
            <b>Total: ₹{order.amount}</b>

            <span className="status">{order.status}</span>

            {order.status === "Placed" && (
              <button
                className="cancel-btn"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}

          </div>

        </div>

      ))}

    </div>
  );
}