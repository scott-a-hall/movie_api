import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './movie-view.scss';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <Container className="movie-view">
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>Description: {movie.Description}</Card.Text>
                        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                        <Card.Text>Director: {movie.Director.Name}</Card.Text>
                        <Link to={`/`}>
                            <Button variant="link">Back</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}