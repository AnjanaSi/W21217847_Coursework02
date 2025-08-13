import React, { useEffect, useState } from 'react'
import { getBookById, updateBook } from '../../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditBook = () => {
    const [book, setBook] = useState({
        title: "",
        isbn: "",
        authorId: "",
        genreIds:[]
      });

      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const { bookId } = useParams();
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        let processedValue = value;
        if (name === "genreIds") {
          processedValue = value.split(',').map(item => item.trim());
        } else if (name === "authorId") {
          processedValue = parseInt(value, 10);
        }

        setBook({ ...book, [name]: processedValue });
      };
    
      useEffect(() => {
        const fetchBook = async () => {
          try {
            const bookData = await getBookById(bookId);
            setBook(bookData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchBook();
      }, [bookId]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await updateBook(bookId, book);
          if (response.status === 200) {
            setSuccessMessage("Book updated successfully!");
            const updatedBookData = await getBookById(bookId);
            setBook(updatedBookData);
            setErrorMessage("");
          } else {
            setErrorMessage("Error updating book");
          }
        } catch (error) {
          console.error(error);
          setErrorMessage(error.message);
        }
      };
    
      return (
        <div className="container mt-5 mb-5">
          <h3 className="text-center mb-5 mt-5">Edit Book</h3>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label hotel-color">
                    Title
                  </label>
                  <input
                    className="form-control"
                    required
                    name="title"
                    type="text"
                    id="title"
                    value={book.title}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label hotel-color">
                    ISBN
                  </label>
                  <input
                    className="form-control"
                    required
                    name="isbn"
                    type="text"
                    id="isbn"
                    value={book.isbn}
                    onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                  <label htmlFor="authorId" className="form-label hotel-color">
                    Author ID
                  </label>
                  <input
                    className="form-control"
                    required
                    name="authorId"
                    type="number"
                    id="authorId"
                    value={book.authorId}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-3">
                  <label htmlFor="genreIds" className="form-label hotel-color">
                    Genre IDs
                  </label>
                  <input
                    className="form-control"
                    required
                    name="genreIds"
                    type="text"
                    id="genreIds"
                    value={book.genreIds}
                    onChange={handleInputChange}
                />
                </div>
                
                
                <div className="d-grid gap-2 d-md-flex mt-2">
                  <Link
                    to={"/existing-books"}
                    className="btn btn-outline-info ml-5"
                  >
                    Back
                  </Link>
                  <button type="submit" className="btn btn-outline-warning">
                    Edit book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditBook