import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "../layout/Loader";
import styles from "../../styles/View.module.css";
import { useAuth } from "../context/authContext";
import {ChevronUp , ChevronDown } from "lucide-react";

const Book = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();

    const [book, setBook] = useState({
        title: "",
        publicationDate: "",
        genre: "",
        author: "",
        availableCopies: "",
        bookType: "",
        photoUrl: "",
    });

    const [authorDetails, setAuthorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAuthorDetails, setShowAuthorDetails] = useState(false);
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);

    const loadComments = async () => {
        try {
            const res = await axios.get(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/${id}/comments`);
            setCommentsList(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
        loadBook();
        loadComments();
    }, []);

    const loadBook = async () => {
        try {
            const res = await axios.get(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/books/${id}`);
            setBook(res.data);
        } catch (err) {
            console.error("Error fetching book data:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadAuthorDetails = async (authorId) => {
        try {
            const res = await axios.get(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/authors/${authorId}`);
            setAuthorDetails(res.data);
            setShowAuthorDetails(true);
        } catch (err) {
            console.error("Error fetching author data:", err);
        }
    };

    const toggleAuthorDetails = () => {
        if (!showAuthorDetails && book.author) {
            loadAuthorDetails(book.author._id);
        } else {
            setShowAuthorDetails(!showAuthorDetails);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment) {
            try {
                const res = await axios.post(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/books/${id}/comments`, {
                    text: comment
                });
                setCommentsList(res.data.comments);
                setComment("");
            } catch (err) {
                console.error("Error submitting comment:", err);
            }
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await axios.delete(`https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/books/${id}/comments/${commentId}`);
            setCommentsList(commentsList.filter(comment => comment._id !== commentId));
        } catch (err) {
            console.error("Error deleting comment:", err);
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
                <h1 className={styles['display-4']}>{book.title}</h1>
                <hr />
                {book.photoUrl && <img src={book.photoUrl} alt={book.title} className={styles.bookImage} />}
                <ul className="list-group">
                    <li className="list-group-item">Title: {book.title}</li>
                    <li className="list-group-item">
                        Publication Date: {new Date(book.publicationDate).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">Genre: {book.genre}</li>
                    <li className="list-group-item">
                        Author: {book.author?.name || "Unknown Author"}
                        {book.author && (
                            <button
                                className={`${styles.btn} ${styles['btn-info']} btn-sm ml-3`}
                                onClick={toggleAuthorDetails}
                            >
                                {showAuthorDetails ? <ChevronUp  /> : <ChevronDown />}
                            </button>
                        )}
                    </li>
                    <li className="list-group-item">Available Copies: {book.availableCopies}</li>
                    <li className="list-group-item">Book Type: {book.bookType}</li>
                </ul>

                {showAuthorDetails && authorDetails && (
                    <div className={styles['mt-4']}>
                        <h3>Author Details</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Name: {authorDetails.name}</li>
                            <li className="list-group-item">Nationality: {authorDetails.nationality}</li>
                            <li className="list-group-item">Date of Birth: {new Date(authorDetails.birthDate).toLocaleDateString()}</li>
                            <li className="list-group-item">Books Written: {authorDetails.books.length}</li>
                        </ul>
                    </div>
                )}

                <div className={styles.commentSection}>
                    <h3>Add Your Comments</h3>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            rows="4"
                            className={styles.textarea}
                            placeholder="Write your comment here"
                        />
                        <button type="submit" className={`${styles.btn} ${styles['btn-success']}`}>
                            Submit Comment
                        </button>
                    </form>

                    <div className={styles.commentsContainer}>
                        <h3 className={styles.commentsTitle}>Comments</h3>
                        {commentsList.length > 0 ? (
                            commentsList.map((comment) => (
                                <div key={comment._id} className={styles.comment}>
                                    <p className={styles.commentText}>{comment.text}</p>
                                    <small className={styles.commentDate}>
                                        {new Date(comment.date).toLocaleString()}
                                    </small>
                                    {isLoggedIn && (
                                        <img
                                            src="/trash.png"
                                            alt="Delete"
                                            className={styles.deleteIcon}
                                            onClick={() => handleCommentDelete(comment._id)}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
