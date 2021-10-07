import React from "react";
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Country.css';
import logo from './globe.png';

export default function CountryCard(props) {
  return (
    <Card style={{ width: '15rem', float: 'left', marginLeft: '20px', marginTop: '20px' }}>
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{props.country.name}</Card.Title>
        <Card.Text>
        Here you will be able to see some basic information about this country.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Population: Not Available</ListGroupItem>
        <ListGroupItem>Region: {props.country.region}</ListGroupItem>
      </ListGroup>
    </Card>
  )
}
