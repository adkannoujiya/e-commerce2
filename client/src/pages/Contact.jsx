import React, { useState } from "react";
import s from "../AllCssFile/Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual API call
    alert("Message submitted!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={s.contactWrapper}>
      <form onSubmit={handleSubmit} className={s.contactForm}>
        <h2 className={s.heading}>Contact Us</h2>

        <label className={s.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={s.input}
        />

        <label className={s.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={s.input}
        />

        <label className={s.label}>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className={s.textarea}
        ></textarea>

        <button type="submit" className={s.button}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
