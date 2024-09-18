import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import styles from "../../styles/EditAuthors.module.css";

const EditAuthors = () => {
    let history = useHistory();
    const { id } = useParams();
    const isValidDate = (date) =>{
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate <= today;
    }
    const [authors, setAuthors] = useState({
        name: "",
        nationality: "",
        birthDate: "",
        books: ""
    });

    const { name, nationality, birthDate, books } = authors;

    const onInputChange = (e) => {
        setAuthors({ ...authors, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        if(!isValidDate(birthDate)){
            return;
        }
        await axios.put(`http://localhost:5000/api/authors/update/${id}`, authors);
        history.push('/');
    }

    const loadAuthors = async () => {
        const result = await axios(`http://localhost:5000/api/authors/${id}`);
        setAuthors(result.data);
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Edit An Author</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Author Name"
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Nationality"
                            name="nationality"
                            value={nationality}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Birth Date"
                            name="birthDate"
                            value={new Date(authors.birthDate).toLocaleDateString()}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter Books"
                            name="books"
                            value={books}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className={styles.button}>Update Author</button>
                </form>
            </div>
        </div>
    );
}

export default EditAuthors;
