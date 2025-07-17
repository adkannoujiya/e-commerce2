import React from "react";
import s from "../AllCssFile/Policy.module.css";

const Policy = () => {
  return (
    <div className={s.policyContainer}>
      <h1 className={s.heading}>Privacy Policy</h1>
      <p className={s.updatedDate}>Last updated: July 15, 2025</p>

      <section className={s.section}>
        <h2 className={s.subHeading}>1. Introduction</h2>
        <p className={s.text}>
          Welcome to our e-commerce website. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          platform.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>2. Information We Collect</h2>
        <ul className={s.list}>
          <li>
            Personal information such as name, email, and shipping address.
          </li>
          <li>
            Payment information processed securely via third-party gateways.
          </li>
          <li>Browsing and purchase history to personalize your experience.</li>
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>3. How We Use Your Information</h2>
        <ul className={s.list}>
          <li>To process and deliver your orders.</li>
          <li>To provide customer support.</li>
          <li>To send promotional offers, only if you opt in.</li>
          <li>To improve our website and services.</li>
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>4. Data Protection</h2>
        <p className={s.text}>
          We implement industry-standard security measures to protect your data.
          All transactions are encrypted using SSL technology.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>5. Third-Party Services</h2>
        <p className={s.text}>
          We may use trusted third-party services (e.g., payment gateways,
          shipping partners) who are also obligated to protect your data.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>6. Your Rights</h2>
        <p className={s.text}>
          You have the right to access, modify, or delete your personal data.
          Contact us at support@example.com for any such requests.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.subHeading}>7. Changes to This Policy</h2>
        <p className={s.text}>
          We may update this Privacy Policy from time to time. We encourage you
          to review it periodically.
        </p>
      </section>

      <p className={s.contactInfo}>
        If you have any questions, please contact us at privacy@example.com.
      </p>
    </div>
  );
};

export default Policy;
