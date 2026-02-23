import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const logged = localStorage.getItem("userLogin");
    if (logged === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      toast.error("No user found. Please signup.");
      navigate("/signup");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("userLogin", "true");
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <center>
      <div className="form-container">

        <h2>User Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

        {/* Admin Login Link */}
        <p style={{marginTop:"15px"}}>
          Are you an Admin?{" "}
          <span
            style={{color:"blue",cursor:"pointer"}}
            onClick={()=>navigate("/admin-login")}
          >
            Admin Login
          </span>
        </p>

      </div>
    </center>
  );
}