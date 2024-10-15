import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "../../styles/AddBook.module.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

const AddBook = () => {
  let history = useHistory();
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const isValidDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= today;
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [book, setBook] = useState({
    title: "",
    publicationDate: "",
    genre: "",
    authorName: "",
    availableCopies: "",
    bookType: "",
    photo: null
  });

  const { title, publicationDate, genre, authorName, availableCopies, bookType } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      try {
        const response = await axios.post("https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/presignedUrl", {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { url, key } = response.data;
        await axios.put(url, selectedFile, {
          headers: {
            "Content-Type": selectedFile.type,
          },
        });
        setBook({ ...book, photo: key });
      } catch (e) {
        console.error("Error getting presigned URL:", e);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidDate(publicationDate)) {
      alert("Invalid publication date");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({
      title,
      publicationDate,
      genre,
      authorName,
      availableCopies,
      bookType,
    }));
    if (book.photo) {
      formData.append("photo", book.photo);
    }

    try {
      console.log("User object:", user);
      const token = user?.signInUserSession?.idToken?.jwtToken;
      console.log("Token:", token);
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.post("https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("Response data:", response.data);
      history.push("/");
    } catch (error) {
      if (error.response) {
        console.error("Error adding book:", error.response.data);
        alert(`Failed to add book: ${error.response.data.message || error.response.data}`);
      } else {
        console.error("Error adding book:", error.message);
        alert(`Failed to add book: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Add A Book</h2>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.uploadContainer}>
                <label htmlFor="fileInput" className={styles.uploadButton}>
                  Upload Photo
                </label>
                <input
                    id="fileInput"
                    type="file"
                    className={styles.hiddenInput}
                    onChange={onFileChange}
                    accept="image/*"
                />
              </div>
              {previewUrl && previewUrl !== "null" && (
                  <div className={styles.imagePreviewContainer}>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className={styles.imagePreview}
                    />
                  </div>
              )}
            </div>
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
