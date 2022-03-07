import { connect } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { deleteMovie, getMovie, setMovieDirector} from "../../ducks/movies/operations";
import { getAllPersons } from "../../ducks/persons/selectors";
import { addActor, deleteMovieActor, getActorList, getMovieActors} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import { getPersonList } from "../../ducks/persons/operations";


const MovieDetails = ({movie, persons, actors, deleteMovie, getMovieActors, addActor, deleteMovieActor, setMovieDirector, movieId, getMovie, getPersonList, 
getActorList, movieActors}, props) => {
    const { t } = useTranslation();
    const selectActorEl = useRef(null);
    const selectDirectorEl = useRef(null);
    const [changingDirector, setChangingDirector] = useState(false);
    const [addingActor, setAddingActor] = useState(false);

    useEffect(() => {
        if (movie === undefined) {
            getMovie(movieId);
        }

        if (persons.length <= 1)
            getPersonList();
        // getActorList();  
        if (actors.length <= 1)
            getMovieActors(movieId);   
    }, []);

    const handleDelete = () => {
        deleteMovie(movie);
        alert("usunięto");
    }

    const handleActorAdd = () => {
        const actorId = Number(selectActorEl.current.value);
        const actorToAdd = persons.find(person => person.id === actorId);
        addActor(movie.id, actorToAdd);
        setAddingActor(false);
    }

    const handleChooseDirector = () => {
        const personId = Number(selectDirectorEl.current.value);
        const director = persons.find(person => person.id === personId);
        const updatedMovie = {
            ...movie,
            director_id: personId
        }
        setMovieDirector(updatedMovie, director);
        setChangingDirector(false);
    } 

    let movieDirectorLink = (<div>{t("no_data")} <button
        onClick={()=> setChangingDirector(true)}
    >{t("set")}</button></div>);


    if (movie && (persons.length > 0) && movie.director_id) {
        const director = persons.find(person => person.id === movie.director_id);
        
        const linkTo = `/persons/${movie.director_id}`;
        movieDirectorLink = (<p>
            <Link to={linkTo}>
        {director.first_name} {director.last_name}
        </Link>
        <button onClick={() => setChangingDirector(true)}>{t("change")}</button>
        </p>
        
        );
    }

    

    const movie_actors = (actors) => actors.map(actor => {
        const person = persons.find(person => person.id === actor.person_id)
        const toLink = `/persons/${actor.person_id}`
        return (<li key={actor.id}>
        <Link to={toLink}>
        {person.first_name} {person.last_name}
        </Link>
        <button onClick={() => deleteMovieActor(actor)}>X</button>
        </li>)
    })


    const personOptions = (persons) => persons.map(person => {
        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
    })

    let directorSelect = (
        <div>
            <select name="choose-director" id="choose-director"
            ref={selectDirectorEl}> 
            {persons && personOptions(persons) }
        </select>
        <button onClick={handleChooseDirector}>{t("save")}</button>
        </div>
    )

    const selectActorElements = (
        <div>
        <select name="actors" id="actors"
        ref={selectActorEl}> 
            {persons && personOptions(persons)}
        </select>
        <button onClick={handleActorAdd}>{t("save")}</button>
        </div>
    )
    
    const contentEl = (movie) => {
        const editLink = `/movies/${movie.id}/edit`
        let content = (
        <div>
            <p>{t("title")}: {movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{t("description")}: {movie.description}</p>
        <p>{t("release_date")}: {movie.release_date.slice(0,10)}</p>
        <p>{t("genre")}: {movie.genre}</p>
        <p>Id: {movie.id}</p>
        <div>{t("director")}: {changingDirector ? directorSelect : movieDirectorLink}</div>

        <div>
        <p>{t("actors")}</p>
        <ul>
            {actors && persons.length > 0 && movie_actors(movieActors)}
        </ul>
        {addingActor ? 
        
            selectActorElements

        : (
            <button onClick={() => setAddingActor(true)}>{t("add_actor")}</button>
        )}
        
        
        </div>
        

        <Link to={editLink}><button>{t("edit_movie")}</button></Link>
        <button onClick={handleDelete}>{t("delete_movie")}</button>
        
        </div>)

        return content;
    }
    

    return ( 
        <div>
        
        {movie ? contentEl(movie) : t("movie_not_found")}
        <div><Link to ="/movies"><button>{t("back_to_movies")}</button></Link></div>
        
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    const id = Number(props.match.params.idMovie);

    const actors = getAllActors(state);
    const movieActors = actors.filter(actor => actor.movie_id === id);

    return {
        movie: state.entities.movies.byId[id],
        persons: getAllPersons(state),
        movieActors,
        actors,
        movieId: id
    };
    
}

const mapDispatchToProps = {
    deleteMovie,
    getMovieActors,
    addActor,
    deleteMovieActor,
    setMovieDirector,
    getMovie,
    getPersonList,
    getActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);