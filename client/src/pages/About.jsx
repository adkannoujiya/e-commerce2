import React from "react";
import s from "../AllCssFile/About.module.css";

const About = () => {
  return (
    <div className={s.aboutContainer}>
      <div className={s.headerSection}>
        <h1 className={s.heading}>About Us</h1>
        <p className={s.subText}>
          Discover who we are and what makes us your trusted shopping partner.
        </p>
      </div>

      <div className={s.contentSection}>
        <h2 className={s.sectionHeading}>Our Mission</h2>
        <p className={s.text}>
          Our mission is to provide a seamless, secure, and enjoyable online
          shopping experience. We bring together top-quality products, fast
          delivery, and exceptional customer support to meet your needs.
        </p>

        <h2 className={s.sectionHeading}>Why Choose Us?</h2>
        <ul className={s.list}>
          <li>Wide range of high-quality products</li>
          <li>Affordable prices and regular discounts</li>
          <li>Fast, reliable, and trackable shipping</li>
          <li>Easy returns and responsive customer service</li>
        </ul>

        <h2 className={s.sectionHeading}>Our Story</h2>
        <p className={s.text}>
          Started in 2025, we are a passionate team dedicated to redefining
          e-commerce in India. From humble beginnings to a growing customer
          base, our focus has always remained the same — customer satisfaction.
        </p>
      </div>
    </div>
  );
};

export default About;
