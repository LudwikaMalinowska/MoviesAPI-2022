import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";
import {getMovieList} from "../../ducks/movies/operations";
import {getActorList} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import {getAllMovies} from "../../ducks/movies/selectors";
const _ = require('lodash');


const Statistics = ({actors, movies, persons, getActorList, getMovieList, getPersonList}, props) => {
    const { t } = useTranslation();

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
                if (actor.person_id === person.id)
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
                    <p className="bold">{person.first_name} {person.last_name}</p>
                    <p>{t("movie_count")}: {actor.count}</p>
                    <p>{t("movies")}:</p>
                    <ul>{moviesPlayed}</ul>
                </li>
            )
        }
        )

        const topThreeActors = content.slice(0,3);
        return <ul>{topThreeActors}</ul>;
    }

    const countMostActorsCountries = (actors, persons) => {
        const personsIds = actors.map(actor => actor.person_id);
        const actorPersons = persons.filter(person => personsIds.includes(person.id));

        let nationalitiesCount = _.countBy(actorPersons, (actor) => actor.nationality);
        const keys = Object.keys(nationalitiesCount);

        nationalitiesCount = keys.map(key => (
            {
                nationality: key,
                count: nationalitiesCount[key]
            }
        ))

        return nationalitiesCount;
    }

    const mostActorsNationalitiesEl = () => {
        let mostActorsNationalities = countMostActorsCountries(actors, persons);
        mostActorsNationalities.sort(obj => obj.count)

        const content = mostActorsNationalities.map(nat => (
            <div key={nat.nationality}>
                <p>{t("nationality")}: {nat.nationality}, {t("actor_count")}: {nat.count}</p>
            </div>
        ))

        return (
            <div className="actors-nationalities">
                {content}
            </div>
        )
    }

    const countActorsInMovie = (movies, actors) => {
        const countActors = [];

        for (const movie of movies) {
            const actorIds = [];
            for (const actor of actors) {
                if (actor.movie_id === movie.id){
                    actorIds.push(actor.person_id);
                }
            }

            countActors.push({
                movie_id: movie.id,
                actor_ids: actorIds,
                actor_count: actorIds.length
            })
        }

        return countActors;
    }

    const mostActorMovies = (movies, actors) => {
        const countActors = countActorsInMovie(movies, actors);
        countActors.sort((m1, m2) => m2.actor_count - m1.actor_count);
        
        const top3Movies = countActors.slice(0,3)

        const content = top3Movies.map(count_movie => {
            const movie = movies.find(movie => movie.id === count_movie.movie_id);

            return (
            <div className="movie" key={movie.id}>
                <p>{movie.title} - {count_movie.actor_count}</p>
                 <Link to={`/movies/${movie.id}`}><button>{t("details")}</button></Link>
             </div>
            )
        })

        return (<div className="top-most-actor-movies">
            {content}
        </div>)
    }

    return ( 
        <div>
            <h2>{t("statistics")}</h2>
            <h3>{t("movies_with_most_actors")}</h3>
            <div>{mostActorMovies(movies, actors)}</div>

            <h3>{t("actors_with_most_movies")}</h3>
            {persons && movies && actors && mostMovieActorsEl()}
            
            <h3>{t("number_of_actors_nationality")}:</h3>
            {persons && movies && actors && mostActorsNationalitiesEl()}
            
        </div>
     );
}
 
const mapStateToProps = (state) => {
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