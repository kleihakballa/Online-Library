import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import styles from "../../styles/EditBook.module.css";

const EditBook = () => {
  let history = useHistory();
  const { id } = useParams();
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
    bookType: "standard"
  });

  const { title, publicationDate, genre, authorName, availableCopies, bookType } = book;

  const onInputChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBook();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    if(!isValidDate(publicationDate)){
      return;
    }
    await axios.put(`http://localhost:5000/api/books/update/${id}`, book);
    history.push("/");
  };

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:5000/api/books/${id}`);
    setBook(result.data);
  };

  return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Edit A Book</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={`${styles.input} ${styles.input}`}
                  placeholder="Enter Book Title"
                  name="title"
                  value={title}
                  onChange={e => onInputChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="date"
                  className={`${styles.input} ${styles.input}`}
                  placeholder="Enter Publication Date"
                  name="publicationDate"
                  value={publicationDate}
                  onChange={e => onInputChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={`${styles.input} ${styles.input}`}
                  placeholder="Enter Genre"
                  name="genre"
                  value={genre}
                  onChange={e => onInputChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="text"
                  className={`${styles.input} ${styles.input}`}
                  placeholder="Enter Author Name"
                  name="authorName"
                  value={authorName}
                  onChange={e => onInputChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                  type="number"
                  className={`${styles.input} ${styles.input}`}
                  placeholder="Enter Available Copies"
                  name="availableCopies"
                  value={availableCopies}
                  onChange={e => onInputChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <select
                  className={`${styles.select} ${styles.input}`}
                  name="bookType"
                  value={bookType}
                  onChange={e => onInputChange(e)}
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <button className={styles.button} type="submit">Update Book</button>
          </form>
        </div>
      </div>
  );
};

export default EditBook;
