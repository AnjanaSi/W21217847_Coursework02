import React, { useState } from 'react'
import { addAuthor } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const AddAuthor = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: "",
        biography: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleBookInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    
    setNewAuthor({ ...newAuthor, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const success = await addAuthor(
        newAuthor.name,
        newAuthor.biography
        );
        if (success != undefined) {
        setSuccessMessage("A new author was added to the database.");
        setNewAuthor({name: "",biography: ""});
        setErrorMessage("");
        } else {
        setErrorMessage("Error in adding a new author");
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
            <h2 className="mt-5 mb-2">Add a New Author</h2>

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
                    Author Name
                </label>
                <input
                    className="form-control"
                    required
                    name="name"
                    type="text"
                    id="name"
                    value={newAuthor.name}
                    onChange={handleBookInputChange}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="biography" className="form-label">
                    Biography
                </label>
                <input
                    className="form-control"
                    required
                    name="biography"
                    type="text"
                    id="biography"
                    value={newAuthor.biography}
                    onChange={handleBookInputChange}
                />
                </div>

                <div className="d-grid gap-2 d-md-flex mt-2">
                <Link to={"/existing-authors"} className="btn btn-outline-info">
                    Existing Authors
                </Link>
                <button type="submit" className="btn btn-outline-primary ml-5">
                    Save Author
                </button>
                </div>
            </form>
            </div>
        </div>
        </section>
    </>
    );
}

export default AddAuthor