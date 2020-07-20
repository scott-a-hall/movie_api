import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { director } = this.props;

        if (!director) return null;

        return (
            <div className="director-view">
                <Card.Body>
                    <Card.Title>Director: {director.Name}</Card.Title>
                    <Card.Text>About: {director.Bio}</Card.Text>
                    <Card.Text>Born: {director.Born}</Card.Text>
                    <Link to={'/'}>
                    <   Button variant="link">Back</Button>
                    </Link>
                </Card.Body>
            </div>
        );
    }
}