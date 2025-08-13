import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import { Col, Container, Row } from 'react-bootstrap';
import Paginator from '../common/Paginator';
import { getAllBooks } from '../../utils/ApiFunctions';

const Book = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(4);
    //const [filteredData, setFilteredData] = useState([{ id: "" }]);
  
    useEffect(() => {
      setIsLoading(true);
      getAllBooks()
        .then((data) => {
          setData(data);
          //setFilteredData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, []);
    if (isLoading) {
      return <div>Loading rooms.....</div>;
    }
    if (error) {
      return <div className=" text-danger">Error : {error}</div>;
    }
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const totalPages = Math.ceil(data.length / booksPerPage);
  
    const renderBooks = () => {
      const startIndex = (currentPage - 1) * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      return data
        .slice(startIndex, endIndex)
        .map((book) => <BookCard key={book.id} book={book} />);
    };
  
    return (
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0 hotel-color">
            All Books
          </Col>
  
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
  
        <Row>{renderBooks()}</Row>
  
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    );
}

export default Book