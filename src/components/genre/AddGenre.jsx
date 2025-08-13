import React, { useState } from 'react'
import { addGenre } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const AddGenre = () => {
    const [newGenre, setNewGenre] = useState({
        name: "",
        description: ""
      });
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
      const handleBookInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setNewGenre({ ...newGenre, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const success = await addGenre(
            newGenre.name,
            newGenre.description,
          );
          if (success != undefined) {
            setSuccessMessage("A new genre was added to the database.");
            setNewGenre({name: "",description: ""});
            setErrorMessage("");
          } else {
            setErrorMessage("Error in adding a new genre");
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
                <h2 className="mt-5 mb-2">Add a New Genre</h2>
    
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
                    <label htmlFor="name" className="form-label">
                        Genre Name
                    </label>
                    <input
                        className="form-control"
                        required
                        name="name"
                        type="text"
                        id="name"
                        value={newGenre.name}
                        onChange={handleBookInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        className="form-control"
                        required
                        name="description"
                        type="text"
                        id="description"
                        value={newGenre.description}
                        onChange={handleBookInputChange}
                    />
                  </div>
    
                  <div className="d-grid gap-2 d-md-flex mt-2">
                    <Link to={"/existing-genres"} className="btn btn-outline-info">
                      Existing Genres
                    </Link>
                    <button type="submit" className="btn btn-outline-primary ml-5">
                      Save Genre
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      );
}

export default AddGenre