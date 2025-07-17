import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";
import s from "../../AllCssFile/UserProfile.module.css";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, address, phone, password } = auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setPassword(password);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth/update-profile",
        { name, email, password, phone, address }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data?.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        alert("Updated successfully");
      } else {
        alert("Updation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row p-3">
      <div className="col-md-3">
        <UserMenu />
      </div>

      <div className={`col-md-6 card ${s.formCard}`}>
        <h2 className="text-center mb-4">Update Your Profile</h2>

        <form onSubmit={handleSubmit} className={s.profileForm}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={s.inputField}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled
            className={s.inputField}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={s.inputField}
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className={s.inputField}
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className={s.inputField}
          />
          <button type="submit" className={s.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
