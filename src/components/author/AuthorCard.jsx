import React from 'react'
import { Card, Col } from 'react-bootstrap'

const AuthorCard = ({author}) => {
    return (
        <Col key={author.id} className="mb-4" xs={12}>
          <Card>
            <Card.Body className="d-flex flex-wrap align-items-center">
            
              <div className="flex-grow-1 ml-3 px-5">
                <Card.Title className="hotel-color">{author.name}</Card.Title>
                
                <Card.Text>
                  {author.biography}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      )
}

export default AuthorCard