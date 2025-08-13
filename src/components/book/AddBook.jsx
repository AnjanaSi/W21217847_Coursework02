import React, { useState } from 'react'
import { addBook } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const AddBook = () => {
    const [newBook, setNewBook] = useState({
        title: "",
        isbn: "",
        authorId: "",
        genreIds:[]
      });
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
      const handleBookInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
    
        if (name === "genreIds") {
            value = value.split(',').map(item => item.trim());
          }
          if (name === "authorId") {
            value = parseInt(value, 10);
          }
        setNewBook({ ...newBook, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const success = await addBook(
            newBook.title,
            newBook.isbn,
            newBook.authorId,
            newBook.genreIds,
          );
          if (success != undefined) {
            setSuccessMessage("A new book was added to the database.");
            setNewBook({title: "",isbn: "",authorId: "",genreIds:[] });
            setErrorMessage("");
          } else {
            setErrorMessage("Error in adding a new book");
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
    
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
    
      return (
        <>
          <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <h2 className="mt-5 mb-2">Add a New Book</h2>
    
                {successMessage && (
                  <div className="alert alert-success fade show">
                    {successMessage}
                  </div>
                )}
    
                {errorMessage && (
                  <div className="alert alert-danger fade show">{errorMessage}</div>
                )}
    
                <form onSubmit={handleSubmit}>
    
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        className="form-control"
                        required
                        name="title"
                        type="text"
                        id="title"
                        value={newBook.title}
                        onChange={handleBookInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">
                        ISBN
                    </label>
                    <input
                        className="form-control"
                        required
                        name="isbn"
                        type="text"
                        id="isbn"
                        value={newBook.isbn}
                        onChange={handleBookInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="authorId" className="form-label">
                        Author ID
                    </label>
                    <input
                        className="form-control"
                        required
                        name="authorId"
                        type="number"
                        id="authorId"
                        value={newBook.authorId}
                        onChange={handleBookInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="genreIds" className="form-label">
                        Genre IDs
                    </label>
                    <input
                        className="form-control"
                        required
                        name="genreIds"
                        type="text"
                        id="genreIds"
                        value={newBook.genreIds}
                        onChange={handleBookInputChange}
                    />
                  </div>
    
                  <div className="d-grid gap-2 d-md-flex mt-2">
                    <Link to={"/existing-books"} className="btn btn-outline-info">
                      Existing Books
                    </Link>
                    <button type="submit" className="btn btn-outline-primary ml-5">
                      Save Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      );
}

export default AddBook