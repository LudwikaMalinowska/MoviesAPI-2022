import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ActorDetails = (props) => {

    const movies = props.actorMovies;
    const movieList = movies.map(movie => (
        <li key={movie.id}>{movie.title} - {movie.productionYear}</li>
    ))
    const actor = props.actor;
    const toLink = `/actors/${actor.id}/edit`

    return (
        <div>
            <p>Imię: {actor.firstName}</p>
            <p>Nazwisko: {actor.lastName}</p>
            <p>Wiek: {actor.age}</p>
            <p>Filmy: </p>
            <ul>
                {movieList}
            </ul>
            <Link to={toLink}><button>Edytuj</button></Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const actor = state.actors.find(actor => actor.id === id);
    const actorMovies = state.movies.filter(movie => movie.actorId === actor.id)

    return {
        actors: state.actors,
        actor,
        actorMovies
    }
}

export default connect(mapStateToProps, null)(ActorDetails);