import { connect } from "react-redux";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteMovie} from "../../ducks/movies/operations";
// import { getAllMovieActors } from "../../ducks/movies/selectors";
import { getAllPersons } from "../../ducks/persons/selectors";
import { addActor, getActorList} from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";


const MovieDetails = ({movie, persons, actors, deleteMovie, getActorList}, props) => {
    const selectActorEl = useRef(null);
    console.log(actors);

    useEffect(() => {

        getActorList(movie.id)  
        // mActors(movie.id);  
            
    }, []);

    const handleDelete = () => {
        deleteMovie(movie);
        alert("usunięto");
    }

    const handleActorAdd = () => {
        const actorId = Number(selectActorEl.current.value);
        console.log(actors);
        console.log(actorId);
        console.log(persons);
        const actorToAdd = persons.find(person => person.id === actorId);
        addActor(movie.id, actorToAdd);

    }

    let movieDirectorLink = "Brak danych";
    if (movie.director_id) {
        const director = persons.find(person => person.id === movie.director_id);
        console.log("director: ", director);
        const linkTo = `/persons/${director.id}`;
        movieDirectorLink = (
        <Link to={linkTo}>
        {director.first_name} {director.last_name}
        </Link>
        );
    }

    const movie_actors = actors.map(actor => {
        console.log(actor);
        return (<li key={actor.id}>{actor.first_name} {actor.last_name}</li>)
    })

    const addActorOptions = persons.map(person => {
        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
    })
    

    const editLink = `/movies/${movie.id}/edit`
    let content = movie ? (
        <div>
            <p>{movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{movie.description}</p>
        <p>{movie.release_date}</p>
        <p>{movie.genre}</p>
        <p>{movie.id}</p>
        <p>Reżyser: {movieDirectorLink}</p>

        <div>
        <p>Aktorzy</p>
        <ul>
            {movie_actors}
        </ul>
        <select name="actors" id="actors"
        ref={selectActorEl}> 
            {addActorOptions}
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
    getActorList,
    addActor
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);