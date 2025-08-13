import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getGenreById, updateGenre } from '../../utils/ApiFunctions';

const EditGenre = () => {
    const [genre, setGenre] = useState({
        name: "",
        description: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { genreId } = useParams();

    const handleInputChange = (event) => {
    const { name, value } = event.target;

    setGenre({ ...genre, [name]: value });
    };

    useEffect(() => {
    const fetchGenre = async () => {
        try {
        const genreData = await getGenreById(genreId);
        setGenre(genreData);
        } catch (error) {
        console.error(error);
        }
    };

    fetchGenre();
    }, [genreId]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await updateGenre(genreId, genre);
        if (response.status === 204) {
        setSuccessMessage("Genre updated successfully!");
        const updatedgenreData = await getGenreById(genreId);
        setGenre(updatedgenreData);
        setErrorMessage("");
        } else {
        setErrorMessage("Error updating genre");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
    }
    };

    return (
    <div className="container mt-5 mb-5">
        <h3 className="text-center mb-5 mt-5">Edit genre</h3>
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
                Genre Name
                </label>
                <input
                className="form-control"
                required
                name="name"
                type="text"
                id="name"
                value={genre.name}
                onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label hotel-color">
                Description
                </label>
                <input
                className="form-control"
                required
                name="description"
                type="text"
                id="description"
                value={genre.description}
                onChange={handleInputChange}
                />
            </div>

            <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                to={"/existing-genres"}
                className="btn btn-outline-info ml-5"
                >
                Back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                Edit genre
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
    );
}

export default EditGenre