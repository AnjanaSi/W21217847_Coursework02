import React, { useEffect, useState } from 'react'
import { getAllGenres } from '../../utils/ApiFunctions';
import GenreCard from './GenreCard';
import { Col, Container, Row } from 'react-bootstrap';
import Paginator from '../common/Paginator';

const Genre = () => {
  const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [genresPerPage] = useState(4);
  
    useEffect(() => {
      setIsLoading(true);
      getAllGenres()
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
      return <div>Loading genres.....</div>;
    }
    if (error) {
      return <div className=" text-danger">Error : {error}</div>;
    }
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const totalPages = Math.ceil(data.length / genresPerPage);
  
    const renderGenres = () => {
      const startIndex = (currentPage - 1) * genresPerPage;
      const endIndex = startIndex + genresPerPage;
      return data
        .slice(startIndex, endIndex)
        .map((genre) => <GenreCard key={genre.id} genre={genre} />);
    };
  
    return (
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0 hotel-color">
            All Genres
          </Col>
  
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
  
        <Row>{renderGenres()}</Row>
  
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

export default Genre