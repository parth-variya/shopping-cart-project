import "./Receipt.css";
import { useNavigate } from "react-router-dom";

export default function Receipt() {

  const navigate = useNavigate(); 

  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) return <h2 style={{ textAlign: "center" }}>No Receipt Found</h2>;

  return (
    <div className="receipt">

      <h2>Payment Receipt</h2>

      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Date:</b> {order.date}</p>
      <p><b>Payment Method:</b> {order.paymentMethod.toUpperCase()}</p>

      <hr />

      {order.items.map(i => (
        <p key={i.id}>
          {i.name} × {i.qty} = ₹{i.price * i.qty}
        </p>
      ))}

      <hr />

      <h3>Total Paid: ₹{order.amount}</h3>
      
       <button onClick={() => navigate("/")}>
        Continue Shopping
      </button>

    </div>
  );
}
