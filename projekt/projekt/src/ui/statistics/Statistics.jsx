import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";
import {getMovieList} from "../../ducks/movies/operations";
import {getActorList} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import {getAllMovies} from "../../ducks/movies/selectors";


const Statistics = ({actors, movies, persons, getActorList, getMovieList, getPersonList}, props) => {
    useEffect(() => {
        getPersonList();
        getMovieList();
        getActorList();
    }, [])

    const findMostMovieActors = (actors, persons) => {
        const countMoviesPlayed = []
        for (const person of persons) {
            let movieIds = [];
            for (const actor of actors) {
                movieIds.push(actor.movie_id);
            }

            countMoviesPlayed.push({
                person_id: person.id,
                movie_ids: movieIds,
                count: movieIds.length
            })
        }

        return countMoviesPlayed;
    }

    const mostMovieActorsEl = () => {
        const mostMovieActors = findMostMovieActors(actors, persons);
        mostMovieActors.sort(actor => actor.count);
        const content = mostMovieActors.map(actor => {

            const person = persons.find(person => person.id === actor.person_id);
            const moviesPlayed = actor.movie_ids.map(id => {
                const actor_movie = movies.find(movie => movie.id === id);
                const toLink = `/movies/${id}`
                return (<li key={id}><Link to={toLink}>{actor_movie.title}</Link></li>)
            })
            return (
                <li key={actor.person_id}>
                    <p>{person.first_name} {person.last_name}</p>
                    <p>Liczba filmów: {actor.count}</p>
                    <p>Filmy:</p>
                    <ul>{moviesPlayed}</ul>
                </li>
            )
        }
        )

        const topThreeActors = content.slice(0,3);
        return topThreeActors;
    }

    return ( 
        <div>
            Statistics
            {persons && movies && actors && mostMovieActorsEl()}
        </div>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        persons: getAllPersons(state),
        movies: getAllMovies(state),
        actors: getAllActors(state)
    };
    
}

const mapDispatchToProps = {
    getPersonList,
    getMovieList,
    getActorList,
    getAllActors,
    getAllPersons,
    getAllMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);