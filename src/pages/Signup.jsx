import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const valid =
      emailRegex.test(email) &&
      password.length >= 8 &&
      name.trim().length > 0 &&
      confirmPassword === password;

    setIsValid(valid);

  }, [email, password, confirmPassword, name]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === email) {
      toast.error("User already exists. Please login.");
      navigate("/login");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupTime = new Date().toLocaleString();

    const user = {
      name,
      email,
      password,
      signupTime
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userName", name);

    toast.success("Signup Successful. Please login.");

    // ❌ No auto login
    // localStorage.setItem("userLogin", "true");

    // ✅ Redirect to Login
    navigate("/login");
  };



  return (
    <center>
      <div className="form-container">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />

          {confirmPassword && confirmPassword !== password && (
            <p style={{color:"red", fontSize:"14px"}}>
              Password does not match
            </p>
          )}

          <button disabled={!isValid}>
            Signup
          </button>

        </form>

      </div>
    </center>
  );
}