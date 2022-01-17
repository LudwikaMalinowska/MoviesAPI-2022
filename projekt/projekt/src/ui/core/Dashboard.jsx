import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";
import {getMovieList} from "../../ducks/movies/operations";
import {getActorList} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import {getAllMovies} from "../../ducks/movies/selectors";

const Dashboard = ({movies, persons, actors, getMovieList, getActorList, getPersonList}, props) => {

    useEffect(() => {

        getPersonList();
        getMovieList();
        getActorList();
        
    }, []);


    const newestMovies = (movies) => {
        let sortedMovies = [...movies];
        console.log(sortedMovies);
        sortedMovies.sort((movie1, movie2) => {
            const date1 = new Date(movie1.release_date);
            const date2 = new Date (movie2.release_date);

            return date2.getTime() - date1.getTime();
        });
        const recentMovies = sortedMovies.slice(0,5);

        const movieBoard = recentMovies.map(movie => (
            <div className="movie" key={movie.id}>
                <p>{movie.title} - {movie.release_date.slice(0,10)} </p>
                <Link to={`/movies/${movie.id}`}><button>Szczegóły</button></Link>
            </div>
        ))

        return movieBoard;
    }





    return ( 
        <div>
        <h4>Liczba filmów w bazie: {movies.length}</h4>
        <h4>Liczba osób w bazie: {persons.length}</h4>
        <h3>Najnowsze filmy: </h3>
        <div>{newestMovies(movies)}</div>
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return {
        persons: getAllPersons(state),
        movies: getAllMovies(state),
        actors: getAllActors(state)
    }
}

const mapDispatchToProps = {
    getMovieList,
    getPersonList,
    getActorList,
    getAllMovies,
    getAllPersons,
    getAllActors
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);