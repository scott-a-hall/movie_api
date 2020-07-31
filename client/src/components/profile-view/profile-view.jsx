import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import Axios from 'axios';

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    getUser(token) {
        const username = localStorage.getItem('user');

        Axios.get(`https://sah-movie-database.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies } = this.props;
        const favoriteMoviesList = movies.filter((movie) =>
            this.state.favoriteMovies.includes(movie._id)
        );

        return (
            <div className="profile-view">
                <Card.Body>
                    <Card.Text>Username: {this.state.Username}</Card.Text>
                    <Card.Text>Password: xxxxx</Card.Text>
                    <Card.Text>Email: {this.state.Email}</Card.Text>
                    <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
                    Favorite Movies: {favoriteMoviesList.map((movie) => (
                        <div key={movie.id} className="favorite-movies">
                            <Link to={`/movies/${movie._id}`}>
                                <Button variant="link">{movie.Title}</Button>
                            </Link>
                            <Button onClick={(e) => this.deleteFavoriteMovie(movie._id)}>Remove Movie</Button>
                        </div>
                    ))}
                    <Link to={'/user/update'}>
                        <Button variant="primary">Update Profile</Button>
                    </Link>
                    <Button onClick={() => this.deleteUser()}>Delete User</Button>
                    <Link to={`/`}>
                        <Button variant="link">Back</Button>
                    </Link>
                </Card.Body>
            </div>
        );
    }
}