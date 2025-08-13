import React, { useEffect, useState } from 'react'
import moment from "moment";
import { getLoanByLoanId, getLoanByUser } from '../../utils/ApiFunctions';

const FindLoan = () => {
    const [loanId, setLoanId] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allLoans, setAllLoans] = useState([]); 
    const [displayedLoans, setDisplayedLoans] = useState([]); 
    const emptyLoanInfo = {
        id: "",
        bookTitle: "",
        loanDate: "",
        dueDate: "",
        returnDate: "",
        isReturned: null,
        borrowerEmail: "",
        borrowerId: ""
    };
    useEffect(() => {
        const fetchAllLoans = async () => {
            try {
                const data = await getLoanByUser();
                setAllLoans(data); 
                if (!loanId) { 
                    setDisplayedLoans(data);
                }
            } catch (error) {
                    setError("Authorization Failed...You are not authorize to access this resource.");
                
            }
        };
        fetchAllLoans();
    }, [loanId]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setLoanId(value);
        if (value === "") {
            setDisplayedLoans(allLoans);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const data = await getLoanByLoanId(loanId);
            setDisplayedLoans([{ ...data }]);
            setError(null);
        } catch (error) {
            console.log('error passed to find loan:',error)
            setDisplayedLoans([emptyLoanInfo]);
            if (error.response) {
                if (error.response.status === 404) {
                    setError(error.response.data || "Loan not found or it does not belong to you.");
                } else if (error.response.status === 403) {
                    setError(error.response.data || "You do not have permission to view this loan.");
                } else {
                    setError("An unexpected error occurred.");
                }
            } else {
                setError(error.message);
            }
        } finally {
            setTimeout(() => setIsLoading(false), 2000);
        }
    };

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Find My Loans</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="loanId"
                            name="loanId"
                            value={loanId}
                            onChange={handleInputChange}
                            placeholder="Enter a loan ID or leave blank"
                        />
                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find
                        </button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Finding your loans...</div>
                ) : error ? (
                    <div className="text-danger">Error: {error}</div>
                ) : displayedLoans.length > 0 ? ( 
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Loan Information</h3>
                        {displayedLoans.map((loan) => (
                            <div key={loan.id} className="mb-3 p-3 border rounded">
                                <p className="text-success">Loan ID: {loan.id}</p>
                                <p>Book Title: {loan.bookTitle}</p>
                                <p>Borrower Email: {loan.borrowerEmail}</p>
                                <p>Borrowed Date: {moment(loan.loanDate).format("MMM Do, YYYY")}</p>
                                <p>Due Date: {moment(loan.dueDate).format("MMM Do, YYYY")}</p>
                                <p>Status: {loan.isReturned ? "Returned" : "Not Returned"}</p>
                                {loan.isReturned && (
                                    <p>Returned Date: {moment(loan.returnDate).format("MMM Do, YYYY")}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No loans found.</div>
                )}
            </div>
        </>
    );
};

export default FindLoan;