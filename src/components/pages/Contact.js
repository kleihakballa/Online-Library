import React, { useState } from "react";
import styles from "../../styles/Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.email.includes("@")) errors.email = "Invalid email address";
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
          setFormStatus("Your message has been sent!");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          setFormStatus("Failed to send message. Please try again.");
        }
      } catch (error) {
        setFormStatus("An error occurred. Please try again.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formControl}
                  value={formData.name}
                  onChange={handleChange}
              />
              {formErrors.name && <small className={styles.error}>{formErrors.name}</small>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formControl}
                  value={formData.email}
                  onChange={handleChange}
              />
              {formErrors.email && <small className={styles.error}>{formErrors.email}</small>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={styles.formControl}
                  value={formData.subject}
                  onChange={handleChange}
              />
              {formErrors.subject && <small className={styles.error}>{formErrors.subject}</small>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                  id="message"
                  name="message"
                  className={styles.formControl}
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
              ></textarea>
              {formErrors.message && <small className={styles.error}>{formErrors.message}</small>}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>

            {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
          </form>
        </div>
      </div>
  );
};

export default Contact;
