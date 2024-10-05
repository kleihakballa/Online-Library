import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "../layout/Loader";
import styles from "../../styles/View.module.css";

const Authors = () => {
    const [author, setAuthor] = useState({
        name: "",
        nationality: "",
        birthDate: "",
        books: []
    });

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [showBooks, setShowBooks] = useState(false);

    useEffect(() => {
        loadAuthor();
    }, []);

    const loadAuthor = async () => {
        try {
            const res = await axios.get(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/authors/${id}`);
            setAuthor(res.data);
        } catch (err) {
            console.error("Error fetching author data:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleBooks = () => {
        if(author.books.length > 0){
            setShowBooks(!showBooks);
        }
    };

    if (loading) {
        return <ScaleLoader />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link className={`${styles.btn} ${styles['btn-info']} mb-4`} to="/">
                    Back to Home
                </Link>
                <h1 className={styles['display-4']}>{author.name}</h1>
                <hr />
                <ul className="list-group w-50">
                    <li className="list-group-item">Name: {author.name}</li>
                    <li className="list-group-item">Nationality: {author.nationality}</li>
                    <li className="list-group-item">
                        Date Of Birth: {new Date(author.birthDate).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                        Books: {author.books.length}{" "}
                        <button onClick={toggleBooks} className={`${styles.btn} ${styles['btn-toggle']} btn-sm ml-3`}>
                            {showBooks ? "-" : "+"}
                        </button>
                        {showBooks && (
                            <ul className="list-group mt-2">
                                {author.books.map((book, index) => (
                                    <li key={index} className="list-group-item">
                                        {book}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Authors;
