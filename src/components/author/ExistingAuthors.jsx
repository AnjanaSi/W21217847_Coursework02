import React, { useEffect, useState } from 'react'
import { deleteAuthor, getAllAuthors } from '../../utils/ApiFunctions';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginator from '../common/Paginator';
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";

const ExistingAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const result = await getAllAuthors();
      setAuthors(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };


  const handleDelete = async (authorId) => {
    try {
      const result = await deleteAuthor(authorId);
      if (result === "") {
        setSuccessMessage(`Author with ID ${authorId} was deleted.`);
        fetchAuthors();
      } else {
        console.error(`Error deleting author : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (authors, authorsPerPage) => {
    const totalAuthors =authors.length;
    return Math.ceil(totalAuthors / authorsPerPage);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

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
        <p>Loading existing authors</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Authors</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-author"}>
                  <FaPlus /> Add Author
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Biography</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentAuthors.map((author) => (
                  <tr key={author.id} className="text-center">
                    <td>{author.id}</td>
                    <td>{author.name}</td>
                    <td>{author.biography}</td>
                    <td className="gap-2">
                      <Link to={`/edit-author/${author.id}`} className="gap-2">
                        <span className="btn btn-warning btn-sm ml-5">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-5"
                        onClick={() => handleDelete(author.id)}
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
                authors,
                authorsPerPage
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
}

export default ExistingAuthors