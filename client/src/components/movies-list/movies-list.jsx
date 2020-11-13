import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

/**
 * lets user filter list of movies
 * @function MoviesList
 */
function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        <Row className="justify-content-md-center">
            {filteredMovies.map((m) => (
                <Col xs="auto">
                    <MovieCard key={m._id} movie={m} />
                </Col>))}
        </Row>
    </div>;
}

export default connect(mapStateToProps)(MoviesList);