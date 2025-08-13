import React from 'react'
import { Card, Col } from 'react-bootstrap'


const BookCard = ({book}) => {
  return (
    <Col key={book.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
        
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{book.title}</Card.Title>
            <Card.Title className="room-price">
              ISBN : {book.isbn}
            </Card.Title>
            <Card.Title className="room-price">
              Author : {book.authorName}
            </Card.Title>
            <Card.Title className="room-price">
              Genres : {book.genres.toString()}
            </Card.Title>
            {/* <Card.Text>
              Some book information goes here for the  to read through
            </Card.Text> */}
          </div>
          {/* <div className="flex-shrink-0 mt-3">
            <Link to={`/book-book/${book.id}`} className="btn btn-hotel btn-sm">
              Borrow
            </Link>
          </div> */}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default BookCard