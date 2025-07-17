import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import s from "../../AllCssFile/Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        alert("Registered successfully");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.registerPage}>
      <h1 className={s.title}>Register</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className={s.input}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={s.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={s.input}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
          className={s.input}
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
          className={s.input}
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Favorite sports name?"
          required
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
