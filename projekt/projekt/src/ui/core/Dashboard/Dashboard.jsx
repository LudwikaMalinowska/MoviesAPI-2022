import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./Dashboard.css"

import { getPersonList } from "../../../ducks/persons/operations";
import { getAllPersons } from "../../../ducks/persons/selectors";
import {getMovieList} from "../../../ducks/movies/operations";
import {getActorList} from "../../../ducks/actors/operations";
import { getAllActors } from "../../../ducks/actors/selectors";
import {getAllMovies} from "../../../ducks/movies/selectors";

const Dashboard = ({movies, persons, actors, getMovieList, getActorList, getPersonList}, props) => {
    const { t } = useTranslation();

    useEffect(() => {

        if (persons.length <= 1)
            getPersonList();
        if (movies.length <= 1)
            getMovieList();
        if (actors.length <= 1)
            getActorList();
        
    }, []);


    const newestMovies = (movies) => {
        let sortedMovies = [...movies];
        
        sortedMovies.sort((movie1, movie2) => {
            const date1 = new Date(movie1.release_date);
            const date2 = new Date (movie2.release_date);

            return date2.getTime() - date1.getTime();
        });
        const recentMovies = sortedMovies.slice(0,5);

        const movieBoard = recentMovies.map(movie => (
            <div className="movie" key={movie.id}>
                <img src={movie.image_url} alt={movie.title} />
                <p>{movie.title} - {movie.release_date.slice(0,10)} </p>
                <Link to={`/movies/${movie.id}`}>
                <button>{t("details")}</button></Link>
            </div>
        ))

        return movieBoard;
    }





    return ( 
        <div>
        <h4>{t("movies_in_database")}: {movies.length}</h4>
        <h4>{t("persons_in_database")}: {persons.length}</h4>
        <h3>{t("newest_movies")}: </h3>
        <div className="newest-movies">
            {newestMovies(movies)}
        </div>
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