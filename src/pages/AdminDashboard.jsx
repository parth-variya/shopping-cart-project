import { useNavigate } from "react-router-dom";
import "./Admin.css";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Tooltip,
 Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminDashboard(){

 const navigate = useNavigate();
 const products = JSON.parse(localStorage.getItem("products")) || [];
 const orders = JSON.parse(localStorage.getItem("orders")) || [];

 const totalOrders = orders.length;

 const totalPayment = orders.reduce((t,o)=>t+o.amount,0);

 const stockOut = products.filter(p=>p.stock===0).length;
 const stockIn = products.filter(p=>p.stock>0).length;

 const data = {
   labels:["Stock In","Stock Out","Orders"],
   datasets:[
     {
       label:"Dashboard",
       data:[stockIn,stockOut,totalOrders],
       backgroundColor:["green","red","blue"]
     }
   ]
 };

 return(

  <div className="dashboard">

    <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

   <h2>Dashboard</h2>

   <div className="cards">

    <div className="card">
     Total Orders<br/><b>{totalOrders}</b>
    </div>

    <div className="card">
     Payment Received<br/><b>₹{totalPayment}</b>
    </div>

    <div className="card">
     Stock In<br/><b>{stockIn}</b>
    </div>

    <div className="card">
     Stock Out<br/><b>{stockOut}</b>
    </div>

   </div>

   <div className="chart-box">
     <Bar data={data}/>
   </div>

   <h3>User Orders</h3>

   {orders.map(o=>(
     <div key={o.id} className="order-box">
       <p>ID: {o.id}</p>
       <p>Amount: ₹{o.amount}</p>
       <p>Status: {o.status}</p>
       <p>Date: {o.date}</p>
     </div>
   ))}

  </div>
 );
}
