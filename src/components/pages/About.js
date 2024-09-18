import React from "react";
import styles from "../../styles/About.module.css";

const About = () => {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>About Us</h1>

          <section className={styles.section}>
            <h2 className={styles.subheading}>Our Mission</h2>
            <p className={styles.text}>
              At our library, we strive to provide an inclusive and welcoming space for all members of our community.
              Our mission is to offer a wide range of resources and services that support learning, research, and personal growth.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subheading}>What We Offer</h2>
            <p className={styles.text}>
              We offer an extensive collection of books, digital resources, and educational programs designed to meet the diverse needs of our patrons.
              Whether you're looking for the latest bestseller, research materials, or engaging community events, our library has something for everyone.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subheading}>Contact Us</h2>
            <p className={styles.text}>
              If you have any questions or need assistance, feel free to reach out to us. Our staff is here to help you with any inquiries or concerns.
            </p>
            <p className={styles.contactInfo}>
              Email: <a href="mailto:support@library.com">support@library.com</a><br />
              Phone: <a href="tel:+355698183281">+355 69 8183 281</a><br />
              Address:  Library St, Tirane.
            </p>
          </section>
        </div>
      </div>
  );
};

export default About;
