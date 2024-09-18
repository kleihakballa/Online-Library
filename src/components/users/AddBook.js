import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "../../styles/AddBook.module.css";
import Confirm from "../layout/Confirmation";

const AddBook = () => {
  let history = useHistory();
  const isValidDate = (date) =>{
      const today = new Date();
      const selectedDate = new Date(date);
      return selectedDate <= today;
  }


  const [book, setBook] = useState({
    title: "",
    publicationDate: "",
    genre: "",
    authorName: "",
    availableCopies: "",
    bookType: ""
  });

  const { title, publicationDate, genre, authorName, availableCopies, bookType } = book;

  const onInputChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if(!isValidDate(publicationDate)){

      return;
    }
    try {
      await axios.post("http://localhost:5000/api/books/add", book, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      history.push("/");
    } catch (error) {
      console.error("Error adding book:", error.response ? error.response.data : error.message);
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Add A Book</h2>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter Book Title"
                  name="title"
                  value={title}
                  onChange={onInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="date"
                  className={styles.input}
                  placeholder="Publication Date"
                  name="publicationDate"
                  value={publicationDate}
                  onChange={onInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter Genre"
                  name="genre"
                  value={genre}
                  onChange={onInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter Author"
                  name="authorName"
                  value={authorName}
                  onChange={onInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="number"
                  className={styles.input}
                  placeholder="Available Copies"
                  name="availableCopies"
                  value={availableCopies}
                  onChange={onInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <select
                  className={styles.select}
                  name="bookType"
                  value={bookType}
                  onChange={onInputChange}
              >
                <option value="">Select Book Type</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <button className={styles.button}>Add Book</button>
          </form>
        </div>
      </div>
  );
};

export default AddBook;
