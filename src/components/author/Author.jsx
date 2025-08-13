import React, { useEffect, useState } from 'react'
import AuthorCard from './AuthorCard';
import { Col, Container, Row } from 'react-bootstrap';
import Paginator from '../common/Paginator';
import { getAllAuthors } from '../../utils/ApiFunctions';

const Author = () => {
  const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(4);
  
    useEffect(() => {
      setIsLoading(true);
      getAllAuthors()
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, []);
    if (isLoading) {
      return <div>Loading Authors.....</div>;
    }
    if (error) {
      return <div className=" text-danger">Error : {error}</div>;
    }
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const totalPages = Math.ceil(data.length / authorsPerPage);
  
    const renderAuthors = () => {
      const startIndex = (currentPage - 1) * authorsPerPage;
      const endIndex = startIndex + authorsPerPage;
      return data
        .slice(startIndex, endIndex)
        .map((author) => <AuthorCard key={author.id} author={author} />);
    };
  
    return (
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0 hotel-color">
            All Authors
          </Col>
  
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
  
        <Row>{renderAuthors()}</Row>
  
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

export default Author