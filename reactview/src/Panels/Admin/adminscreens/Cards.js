import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Cards(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={props.imgsrc} />
                        <Card.Body>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text>
                             <h7 className='red'>  Location: </h7>{props.location}
                            </Card.Text>
                            <Card.Text>
                            <h7 className='red'>  Date: </h7> {props.date}
                            </Card.Text>
                            <Card.Text>
                                {props.details}
                            </Card.Text>
                            <Button variant="danger">Delete Campaign</Button>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
    )
}
