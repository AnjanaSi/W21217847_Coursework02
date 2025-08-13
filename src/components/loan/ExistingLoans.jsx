import React, { useEffect, useState } from 'react';
import { getAllLoansForAdmin, returnBook } from '../../utils/ApiFunctions';
import Paginator from '../common/Paginator';
import { Col, Row } from 'react-bootstrap';
import { FaEdit, FaPlus, FaReply } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ExistingLoans = () => {
    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loansPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        setIsLoading(true);
        try {
            const result = await getAllLoansForAdmin();
            setLoans(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const handleReturn = async (loanId) => {
        try {
            const result = await returnBook(loanId);
            if (result === "Book returned successfully.") {
                setSuccessMessage(`Loan with ID ${loanId} returned successfully.`);
                fetchLoans();
            } else {
                setErrorMessage(result || "Error returning book.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const calculateTotalPages = (loans, loansPerPage) => {
        const totalLoans = loans.length;
        return Math.ceil(totalLoans / loansPerPage);
    };

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastLoan = currentPage * loansPerPage;
    const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
    const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

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
                <p>Loading existing Loans...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Loans</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-loan"} className="btn btn-outline-primary">
                                    <FaPlus /> Add Loan
                                </Link>
                            </Col>
                        </Row>

                        
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="text-center">
                                        <th>ID</th>
                                        <th>Book Title</th>
                                        <th>Borrower Email</th>
                                        <th>Loan Date</th>
                                        <th>Due Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLoans.map((loan) => (
                                        <tr key={loan.id} className="text-center">
                                            <td>{loan.id}</td>
                                            <td>{loan.bookTitle}</td>
                                            <td>{loan.borrowerEmail}</td>
                                            <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                                            <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                                            <td>
                                                {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td>{loan.isReturned ? "Returned" : "Active"}</td>
                                            <td className="gap-2">
                                                <Link to={`/edit-loan/${loan.id}`} className="gap-2">
                                                    <span className="btn btn-warning btn-sm ml-5">
                                                        <FaEdit />
                                                    </span>
                                                </Link>
                                                {!loan.isReturned && (
                                                    <button
                                                        className="btn btn-info btn-sm ml-5"
                                                        onClick={() => handleReturn(loan.id)}
                                                    >
                                                        <FaReply /> Return
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 

                        <Paginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(
                                loans,
                                loansPerPage
                            )}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingLoans;