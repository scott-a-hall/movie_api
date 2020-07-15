import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor(){
        //Call the superclass constructor so React can initialize it
        super();

        //Initialize the state to an empty object so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: false
        };
    }

    //One of the "hooks" available in a React component
    componentDidMount() {
        axios.get('https://sah-movie-database.herokuapp.com/movies')
            .then(response => {
                //Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister() {
        this.setState({
            register: true
        });
    }

    //This overrides the render() method of the superclass
    //No need to call super() though, as it does nothing by default
    render() {
        //If the state isn't initialized, this will throw on runtime before the data is initially loaded
        const { movies, selectedMovie, user, register } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

        if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />

        //Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie}/>
                    : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                ))
                }
            </div>
        );
    }
}