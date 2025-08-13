import React, { useEffect, useState } from 'react'
import { getAuthorById, updateAuthor } from '../../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditAuthor = () => {
    const [author, setAuthor] = useState({
        name: "",
        biography: ""
      });

      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const { authorId } = useParams();
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAuthor({ ...author, [name]: value });
      };
    
      useEffect(() => {
        const fetchAuthor = async () => {
          try {
            const authorData = await getAuthorById(authorId);
            setAuthor(authorData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchAuthor();
      }, [authorId]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await updateAuthor(authorId, author);
          if (response.status === 200) {
            setSuccessMessage("Author updated successfully!");
            const updatedAuthorData = await getAuthorById(authorId);
            setAuthor(updatedAuthorData);
            setErrorMessage("");
          } else {
            setErrorMessage("Error updating author");
          }
        } catch (error) {
          console.error(error);
          setErrorMessage(error.message);
        }
      };
    
      return (
        <div className="container mt-5 mb-5">
          <h3 className="text-center mb-5 mt-5">Edit Author</h3>
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
                  <label htmlFor="name" className="form-label hotel-color">
                    Author Name
                  </label>
                  <input
                    className="form-control"
                    required
                    name="name"
                    type="text"
                    id="name"
                    value={author.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="biography" className="form-label hotel-color">
                    Biography
                  </label>
                  <input
                    className="form-control"
                    required
                    name="biography"
                    type="text"
                    id="biography"
                    value={author.biography}
                    onChange={handleInputChange}
                    />
                </div>
                
                <div className="d-grid gap-2 d-md-flex mt-2">
                  <Link
                    to={"/existing-authors"}
                    className="btn btn-outline-info ml-5"
                  >
                    Back
                  </Link>
                  <button type="submit" className="btn btn-outline-warning">
                    Edit Author
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditAuthor