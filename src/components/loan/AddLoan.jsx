import React, { useState } from 'react';
import { createLoan } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const AddLoan = () => {
    const [newLoan, setNewLoan] = useState({
        bookId: "",
        dueDate: "", 
        borrowerId: "" 
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLoanInputChange = (e) => {
        const { name, value } = e.target;
        setNewLoan({ ...newLoan, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loanData = {
                bookId: parseInt(newLoan.bookId, 10),
                dueDate: new Date(newLoan.dueDate).toISOString(),
                borrowerId: newLoan.borrowerId || null 
            };

            const response = await createLoan(
                loanData.bookId,
                loanData.dueDate,
                loanData.borrowerId
            );

            if (response.id) { 
                setSuccessMessage("A new loan was added successfully.");
                setNewLoan({ bookId: "", dueDate: "", borrowerId: "" }); 
                setErrorMessage("");
            } else {
                setErrorMessage("Error in adding a new loan.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Loan</h2>

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
                                <label htmlFor="bookId" className="form-label">
                                    Book ID
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    name="bookId"
                                    type="number"
                                    id="bookId"
                                    value={newLoan.bookId}
                                    onChange={handleLoanInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label">
                                    Due Date
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    name="dueDate"
                                    type="date" 
                                    id="dueDate"
                                    value={newLoan.dueDate}
                                    onChange={handleLoanInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="borrowerId" className="form-label">
                                    Borrower ID (Optional for Admin)
                                </label>
                                <input
                                    className="form-control"
                                    name="borrowerId"
                                    type="text"
                                    id="borrowerId"
                                    value={newLoan.borrowerId}
                                    onChange={handleLoanInputChange}
                                />
                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-loans"} className="btn btn-outline-info">
                                    Existing Loans
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Loan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddLoan;