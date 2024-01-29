import React, { useState } from "react";
import styles from "./Login.module.css";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    setEmail("");
    setPassword("");
  };

  const handleSignup = function (e) {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.div}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className={styles.div}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <button onClick={handleSignup}>Signup</button>
    </form>
  );
};

export default Login;
