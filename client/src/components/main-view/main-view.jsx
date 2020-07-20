import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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
            movies: [],
            selectedMovie: null,
            user: null,
            register: false
        };
    }

    getMovies(token) {
        axios.get('https://sah-movie-database.herokuapp.com/movies', {
            headers: { Authorization: 'Bearer ${token}'}
        })
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

    //One of the "hooks" available in a React component
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open('/', '_self');
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
        const { movies, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

        //if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />

        //Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path='/' render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                        }
                    }/>
                    <Route path='/register' render={() => <RegistrationView />} />
                    <Route path='/movies/:movieId' render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
                    <Button onClick={() => this.onLoggedOut()}>Log Out</Button>
                </div>
            </Router>
        );
    }
}