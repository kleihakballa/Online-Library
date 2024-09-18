import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ScaleLoader from "../layout/Loader";
import { useAuth } from "../context/authContext";
import styles from "../../styles/Home.module.css";
import Confirmation from "../layout/Confirmation";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [view, setView] = useState("books");
  const [counts, setCounts] = useState({ bookCount: 0, authorCount: 0, userCount: 0 });
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (view === "books") {
      loadBooks();
    } else {
      loadAuthors();
    }
    fetchCounts();
  }, [view]);

  const loadBooks = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/books");
      setBooks(result.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAuthors = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/authors");
      setAuthors(result.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoadingAuthors(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/stat");
      setCounts(result.data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      if (view === "books") {
        await axios.delete(`http://localhost:5000/api/books/delete/${selectedId}`);
        loadBooks();  // Refresh the books list
      } else {
        await axios.delete(`http://localhost:5000/api/authors/delete/${selectedId}`);
        loadAuthors();  // Refresh the authors list
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
      <div className={styles.container}>
        <div className={styles.headerImage}>
          <img src="/library1.jpg" alt="Header Image" className={styles.headerImg}/>
        </div>
        <div className={styles['stats-flex']}>
          <div className={styles['stats-block']}>
            <img src="/books-img.png" alt="Books"/>
            <p>Total Books: {counts.bookCount}</p>
          </div>
          <div className={styles['stats-block']}>
            <img src="/author.png" alt="Authors"/>
            <p>Total Authors: {counts.authorCount}</p>
          </div>
          <div className={styles['stats-block']}>
            <img src="/user-img.png" alt="Users"/>
            <p>Total Users: {counts.userCount}</p>
          </div>
        </div>

        <div className="py-4">
          <h1>{view === "books" ? "Books" : "Authors"}</h1>
          <button
              className={`${styles.btn} ${styles['btn-outline-secondary']} ${view === "books" ? styles.active : ''} mr-4 mb-4 mt-4`}
              onClick={() => setView("books")}
          >
            Books
          </button>
          <button
              className={`${styles.btn} ${styles['btn-outline-secondary']} ${view === "authors" ? styles.active : ''} mr-4 mb-4 mt-4`}
              onClick={() => setView("authors")}
          >
            Authors
          </button>

          {isLoggedIn && (
              <Link className={styles.addEntity} to={view === "books" ? "/book/add" : "/author/add"}>
                {view === "books" ? "Add Book" : "Add Author"}
              </Link>
          )}

          {loading ? (
              <ScaleLoader className={styles['scale-loader']}/>
          ) : view === "books" ? (
              <table className={`${styles.table} border shadow`}>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => (
                    <tr key={book._id}>
                      <th>{index + 1}</th>
                      <td>{book.title}</td>
                      <td>{book.genre}</td>
                      <td>{book.author?.name || 'Unknown Author'}</td>
                      <td className={styles.action}>
                        <Link className={`${styles.btn} ${styles['btn-info']} mr-2`} to={`/users/${book._id}`}>
                          View
                        </Link>
                        {isLoggedIn && (
                            <>
                              <Link className={`${styles.btn} ${styles['btn-outline-primary']} mr-2`}
                                    to={`/users/edit/${book._id}`}>
                                Edit
                              </Link>
                              <button
                                  className={`${styles.btn} ${styles['btn-outline-danger']}`}
                                  onClick={() => handleDeleteClick(book._id)}
                              >
                                Delete
                              </button>
                            </>
                        )}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          ) : loadingAuthors ? (
              <ScaleLoader className={styles['scale-loader']}/>
          ) : (
              <table className={`${styles.table} border shadow`}>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Nationality</th>
                  <th>Date of Birth</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author, index) => (
                    <tr key={author._id}>
                      <th>{index + 1}</th>
                      <td>{author.name}</td>
                      <td>{author.nationality}</td>
                      <td>{new Date(author.birthDate).toLocaleDateString()}</td>
                      <td>
                        <Link className={`${styles.btn} ${styles['btn-info']} mr-2`} to={`/authors/${author._id}`}>
                          View
                        </Link>
                        {isLoggedIn && (
                            <>
                              <Link className={`${styles.btn} ${styles['btn-outline-primary']} mr-2`}
                                    to={`/author/edit/${author._id}`}>
                                Edit
                              </Link>
                              <button
                                  className={`${styles.btn} ${styles['btn-outline-danger']}`}
                                  onClick={() => handleDeleteClick(author._id)}
                              >
                                Delete
                              </button>
                            </>
                        )}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}

          {showModal && (
              <Confirmation
                  message="Are you sure you want to delete this item?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
              />
          )}
        </div>
      </div>
  );
};

export default Home;
