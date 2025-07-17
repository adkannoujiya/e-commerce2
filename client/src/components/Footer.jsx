import React from "react";
import { Link } from "react-router-dom";
import s from "../AllCssFile/Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <h4>All Rights Reserved &copy; Ad Shop</h4>
        <div className={s.links}>
          <Link to="/about" className={s.link}>
            About
          </Link>
          <Link to="/contact" className={s.link}>
            Contact
          </Link>
          <Link to="/policy" className={s.link}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
