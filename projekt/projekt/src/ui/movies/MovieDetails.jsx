import { connect } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { deleteMovie, getMovie, setMovieDirector} from "../../ducks/movies/operations";
// import { getAllMovieActors } from "../../ducks/movies/selectors";
import { getAllPersons } from "../../ducks/persons/selectors";
import { addActor, deleteMovieActor, getMovieActors} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import { getPersonList } from "../../ducks/persons/operations";


const MovieDetails = ({movie, persons, actors, deleteMovie, getMovieActors, addActor, deleteMovieActor, setMovieDirector, movieId, getMovie}, props) => {
    const { t } = useTranslation();
    const selectActorEl = useRef(null);
    const selectDirectorEl = useRef(null);
    const [changingDirector, setChangingDirector] = useState(false);
    const [addingActor, setAddingActor] = useState(false);
    console.log(movie);

    useEffect(() => {
        console.log("-----movie: ", movie);
        if (movie === undefined) {
            getPersonList();
            getMovie(movieId);
        }
            
        console.log("mid:", movieId);
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
        const updatedMovie = {
            ...movie,
            director_id: personId
        }
        setMovieDirector(updatedMovie);
        setChangingDirector(false);
    } 

    let movieDirectorLink = (<div>{t("no_data")} <button
        onClick={()=> setChangingDirector(true)}
    >{t("set")}</button></div>);

console.log("--persons", persons);
    if (movie && (persons.length > 0) && movie.director_id) {
        console.log("--movie", movie);
        console.log("--------persons", persons);
        const director = persons.find(person => person.id === movie.director_id);
        console.log("director: ", director);
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
        console.log(actor);
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
            <p>{movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{movie.description}</p>
        <p>{movie.release_date}</p>
        <p>{movie.genre}</p>
        <p>{movie.id}</p>
        <div>{t("director")}: {changingDirector ? directorSelect : movieDirectorLink}</div>

        <div>
        <p>{t("actors")}</p>
        <ul>
            {actors && persons.length > 0 && movie_actors(actors)}
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
        
        {movie ? contentEl(movie) : "Nie znaleziono filmu"}
        <div><Link to ="/movies"><button>{t("back_to_movies")}</button></Link></div>
        
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.idMovie;
    console.log(state);
    return {
        movie: state.entities.movies.byId[id],
        persons: getAllPersons(state),
        actors: getAllActors(state),
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
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);