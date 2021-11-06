import {useState} from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { deleteMovieFromActorAction, addMovieToActorAction } from '../actions/ActorActions';
import { editMovieAction } from "../actions/MovieActions";


const MovieDetails = (props) => {
    
    const [selectedActor, setSelectedActor] = useState("-1")
    const handleChangeDirector = (e) => {
        const directorId = e.target.value;
        const editedMovie = {...props.movie, directorId}
        props.editMovieAction(editedMovie)
    }

    const handleAddActorToMovie = () => {
        const movie = props.movie;

        if (selectedActor !== "-1"){
            const editedMovie = {
                ...movie, 
                actorIds: [...movie.actorIds, selectedActor]
            }
            props.editMovieAction(editedMovie)

            props.addMovieToActorAction({
                actorId: selectedActor,
                movieId: movie.id
            })
        }
        
    }

    const changeActor = (e) => {
        const actorId = e.target.value;
        setSelectedActor(actorId);
    }

    const deleteActorFromMovie = (actor) => {
        const movie = props.movie;
        const actorIds = movie.actorIds;
        
        const editedMovie = {
            ...movie, 
            actorIds: actorIds.filter(id => id !== actor.id)
        }
        props.editMovieAction(editedMovie)
        // console.log("actorId:", actor.id,
        //     "movieId:", movie.id);
        props.deleteMovieFromActorAction({
            actorId: actor.id,
            movieId: movie.id
        })
    }


    // console.log("props: ", props);
    const movie = props.movie;
    const directors = props.directors;
    const actors = props.actors;
    const movieActors = props.movieActors;
    // console.log("movie actors: ", movieActors);
    // console.log(directors);
    const directorOptions = directors.map(director => (
        <option value={director.id} key={director.id}>
            {director.firstName} {director.lastName}
        </option>
    ))
    const actorOptions = actors.map(actor => (
        <option value={actor.id} key={actor.id}>
            {actor.firstName} {actor.lastName}
        </option>
    ))
    const movieActorsList = movieActors.map(actor => (
        <li key={actor.id}>
            <p>- {actor.firstName} {actor.lastName}</p>
            <button onClick={() => deleteActorFromMovie(actor)}>X</button>
        </li>
    ))
    const toEditLink = `/movies/${movie.id}/edit`
    // console.log(directorOptions);
    return (
        <div>MovieDetails
        <p>Tytuł: {movie.title}</p>
        <p>Rok produkcji: {movie.productionYear}</p>
        <label htmlFor="director">Reżyser: </label>
        <select name="director" value={movie.directorId} onChange={handleChangeDirector}>
            <option value="-1" ></option>
            {directorOptions}
        </select>

        <p>Aktorzy</p>
        <ul>{movieActors ? movieActorsList : null}</ul>

        <select name="actor" value={movie.actorId} 
        onChange={changeActor}>
            <option value="-1" ></option>
            {actorOptions}
        </select>
        <button onClick={handleAddActorToMovie}>Dodaj aktora</button>

        <br /><br />
        <Link to={toEditLink}><button>Edytuj</button></Link>
        <Link to="/movies"><button>Powrót do listy filmów</button></Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    
    // console.log(state.movies);
    const movie = state.movies.find(movie => movie.id === id);
    const actorIds = movie.actorIds;
    const movieActors = state.actors.filter(actor => {
        return actorIds.includes(actor.id)
    })
    
    // console.log(state);
    return {
        movies: state.movies,
        movie: movie,
        directors: state.directors,
        actors: state.actors,
        movieActors: movieActors
    }
}

const mapDispatchToProps = {
    editMovieAction,
    addMovieToActorAction,
    deleteMovieFromActorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);