import React, { useEffect, useState } from 'react'
import { deleteBook, getAllBooks } from '../../utils/ApiFunctions';
import Paginator from '../common/Paginator';
import { Col, Row } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ExistingBooks = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const result = await getAllBooks();
        setBooks(result);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };
  
  
    const handleDelete = async (bookId) => {
      try {
        const result = await deleteBook(bookId);
        if (result === "") {
          setSuccessMessage(`Book with ID ${bookId} was deleted.`);
          fetchBooks();
        } else {
          console.error(`Error deleting book : ${result.message}`);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    };
  
    const calculateTotalPages = (books, booksPerPage) => {
      const totalRooms =books.length;
      return Math.ceil(totalRooms / booksPerPage);
    };
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
      <>
        <div className="container col-md-8 col-lg-6">
          {successMessage && (
            <p className="alert alert-success mt-5">{successMessage}</p>
          )}
  
          {errorMessage && (
            <p className="alert alert-danger mt-5">{errorMessage}</p>
          )}
        </div>
  
        {isLoading ? (
          <p>Loading existing Books</p>
        ) : (
          <>
            <section className="mt-5 mb-5 container">
              <div className="d-flex justify-content-between mb-3 mt-5">
                <h2>Existing Books</h2>
              </div>
  
              <Row>
                <Col md={6} className="mb-2 md-mb-0">
                </Col>
  
                <Col md={6} className="d-flex justify-content-end">
                  <Link to={"/add-book"}>
                    <FaPlus /> Add Book
                  </Link>
                </Col>
              </Row>
  
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Genres</th>
                    <th>Actions</th>
                  </tr>
                </thead>
  
                <tbody>
                  {currentBooks.map((book) => (
                    <tr key={book.id} className="text-center">
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.authorName}</td>
                      <td>{book.isbn}</td>
                      <td>{book.genres.toString()}</td>
                      <td className="gap-2">
                        <Link to={`/edit-book/${book.id}`} className="gap-2">
                          <span className="btn btn-warning btn-sm ml-5">
                            <FaEdit />
                          </span>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm ml-5"
                          onClick={() => handleDelete(book.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginator
                currentPage={currentPage}
                totalPages={calculateTotalPages(
                  books,
                  booksPerPage
                )}
                onPageChange={handlePaginationClick}
              />
            </section>
          </>
        )}
      </>
    );
}

export default ExistingBooks