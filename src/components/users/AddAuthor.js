import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "../../styles/AddBook.module.css";
import {useAuth} from "../context/authContext";

const AddAuthor = () => {


    let history = useHistory();
    const isValidDate = (date) =>{
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate <= today;
    }
    const [author, setAuthor] = useState({
        name: "",
        nationality: "",
        birthDate: "",
        books: ""
    });

    const { name, nationality, birthDate, books } = author;

    const onInputChange = e => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };

        const onSubmit = async e => {
            e.preventDefault();
            if(!isValidDate(birthDate)){
                return;
            }
            try {
                await axios.post("http://localhost:5000/api/authors/add", author, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                history.push("/");
            } catch (error) {
                console.error("Error adding author:", error.response ? error.response.data : error.message);
            }
        };



    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Add An Author</h2>
                <form onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Author Name"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Nationality"
                            name="nationality"
                            value={nationality}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="date"
                            className={styles.input}
                            placeholder="Birth Date"
                            name="birthDate"
                            value={birthDate}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Books"
                            name="books"
                            value={books}
                            onChange={onInputChange}
                        />
                    </div>
                    <button className={styles.button}>Add Author</button>
                </form>
            </div>
        </div>
    );
};

export default AddAuthor;
