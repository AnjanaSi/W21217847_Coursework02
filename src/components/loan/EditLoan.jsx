import React, { useEffect, useState } from 'react';
import { getLoanByLoanId, updateLoan } from '../../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditLoan = () => {
    const [loan, setLoan] = useState({
        dueDate: "",
        returnDate: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams(); 
    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const loanData = await getLoanByLoanId(id);
                
                setLoan({
                    dueDate: loanData.dueDate ? loanData.dueDate.split('T')[0] : "",
                    returnDate: loanData.returnDate ? loanData.returnDate.split('T')[0] : ""
                });
            } catch (error) {
                console.error(error);
                setErrorMessage(error.message);
            }
        };
        fetchLoan();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoan({ ...loan, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                dueDate: loan.dueDate ? loan.dueDate : null,
                returnDate: loan.returnDate ? loan.returnDate : null
            };

            const updatedLoan = await updateLoan(id, updatedData);
            
            if (updatedLoan) {
                setSuccessMessage("Loan updated successfully!");
                setErrorMessage(""); 
            } else {
                setErrorMessage("Error updating loan: The operation failed in the backend.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Loan (ID: {id})</h3>
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
                            <label htmlFor="dueDate" className="form-label hotel-color">
                                Due Date
                            </label>
                            <input
                                className="form-control"
                                name="dueDate"
                                type="date"
                                id="dueDate"
                                value={loan.dueDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="returnDate" className="form-label hotel-color">
                                Return Date
                            </label>
                            <input
                                className="form-control"
                                name="returnDate"
                                type="date"
                                id="returnDate"
                                value={loan.returnDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link
                                to={"/existing-loans"}
                                className="btn btn-outline-info ml-5"
                            >
                                Back to Existing Loans
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Update Loan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditLoan;