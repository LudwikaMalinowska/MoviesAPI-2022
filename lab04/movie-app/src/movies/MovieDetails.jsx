import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { editMovieAction } from "../actions/MovieActions";

const MovieDetails = (props) => {

    const handleChange = (e) => {
        const directorId = e.target.value;
        const editedMovie = {...props.movie, directorId}
        props.editMovieAction(editedMovie)
    }


    // console.log("props: ", props);
    const movie = props.movie;
    const directors = props.directors;
    // console.log(directors);
    const directorOptions = directors.map(director => (
        <option value={director.id} key={director.id}>
            {director.firstName} {director.lastName}
        </option>
    ))
    const toEditLink = `/movies/${movie.id}/edit`
    // console.log(directorOptions);
    return (
        <div>MovieDetails
        <p>Tytuł: {movie.title}</p>
        <p>Rok produkcji: {movie.productionYear}</p>
        <label htmlFor="director">Reżyser: </label>
        <select name="director" value={movie.directorId} onChange={handleChange}>
            <option value="-1" ></option>
            {directorOptions}
        </select>
        <br /><br />
        <Link to={toEditLink}><button>Edytuj</button></Link>
        <Link to="/movies"><button>Powrót do listy filmów</button></Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    // console.log(state);
    return {
        movies: state.movies,
        movie: state.movies.find(movie => movie.id === id),
        directors: state.directors
    }
}

const mapDispatchToProps = {
    editMovieAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);