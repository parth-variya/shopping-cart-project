import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./AdminLogin.css";
import { toast } from "react-toastify";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    // simple demo admin credentials
    if(email==="parth@gmail.com" && password==="parth@2006" || email==="admin@gmail.com" && password==="admin123"){

      localStorage.setItem("adminLogin","true");
      toast.success("Admin Login Success");
      navigate("/admin-products");

    }else{
      toast.error("Wrong Admin Credentials");
    }
  };

  return (

    <div className="admin-login">

      <form onSubmit={handleSubmit} className="admin-card">

        <h2>Admin Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />

        <button>Login</button>

      </form>

    </div>

  );
}
