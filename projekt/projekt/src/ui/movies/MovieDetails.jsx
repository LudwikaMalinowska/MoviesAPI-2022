import { connect } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMovie, setMovieDirector} from "../../ducks/movies/operations";
// import { getAllMovieActors } from "../../ducks/movies/selectors";
import { getAllPersons } from "../../ducks/persons/selectors";
import { addActor, deleteMovieActor, getMovieActors} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";


const MovieDetails = ({movie, persons, actors, deleteMovie, getMovieActors, addActor, deleteMovieActor, setMovieDirector}, props) => {
    const selectActorEl = useRef(null);
    const selectDirectorEl = useRef(null);
    const [changingDirector, setChangingDirector] = useState(false);
    console.log(actors);

    useEffect(() => {

        getMovieActors(movie.id)  
        // mActors(movie.id);  
            
    }, []);

    const handleDelete = () => {
        deleteMovie(movie);
        alert("usunięto");
    }

    const handleActorAdd = () => {
        const actorId = Number(selectActorEl.current.value);
        // console.log("actors:", actors);
        // console.log("actorId:", actorId);
        // console.log("persons:", persons);
        const actorToAdd = persons.find(person => person.id === actorId);
        // console.log("actorToAdd", actorToAdd);
        addActor(movie.id, actorToAdd);
    }

    const handleChooseDirector = () => {
        const personId = Number(selectDirectorEl.current.value);
        const choosenPerson = persons.find(person => person.id === personId);
        setMovieDirector(movie.id, choosenPerson);
        setChangingDirector(false);
    } 

    let movieDirectorLink = "Brak danych";
    if (movie.director_id) {
        const director = persons.find(person => person.id === movie.director_id);
        console.log("director: ", director);
        const linkTo = `/persons/${director.id}`;
        movieDirectorLink = (<p>
            <Link to={linkTo}>
        {director.first_name} {director.last_name}
        </Link>
        <button onClick={() => setChangingDirector(true)}>Zmień</button>
        </p>
        
        );
    }

    

    const movie_actors = actors.map(actor => {
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

    // const addActorOptions = persons.map(person => {
    //     return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
    // })

    const personOptions = persons.map(person => {
        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
    })

    let directorSelect = (
        <div>
            <select name="choose-director" id="choose-director"
            ref={selectDirectorEl}> 
            {personOptions}
        </select>
        <button onClick={handleChooseDirector}>Zapisz</button>
        </div>
    )

    const editLink = `/movies/${movie.id}/edit`
    let content = movie ? (
        <div>
            <p>{movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{movie.description}</p>
        <p>{movie.release_date}</p>
        <p>{movie.genre}</p>
        <p>{movie.id}</p>
        <div>Reżyser: {changingDirector ? directorSelect : movieDirectorLink}</div>

        <div>
        <p>Aktorzy</p>
        <ul>
            {movie_actors}
        </ul>
        <select name="actors" id="actors"
        ref={selectActorEl}> 
            {personOptions}
        </select>
        <button onClick={handleActorAdd}>Dodaj aktora</button>
        </div>
        

        <Link to={editLink}><button>Edytuj film</button></Link>
        <button onClick={handleDelete}>Usuń film</button>
        
        </div>
    ) : "Nie znaleziono filmu";

    return ( 
        <div>
        
        {content}
        
        <Link to ="/movies"><button>Powrót do listy filmów</button></Link>
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
        actors: getAllActors(state)
    };
    
}

const mapDispatchToProps = {
    deleteMovie,
    getMovieActors,
    addActor,
    deleteMovieActor,
    setMovieDirector
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);