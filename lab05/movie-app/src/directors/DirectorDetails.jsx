import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DirectorsDetails = (props) => {

    const movies = props.directorMovies;
    const movieList = movies.map(movie => (
        <li key={movie.id}>{movie.title} - {movie.productionYear}</li>
    ))
    const director = props.director;
    const toLink = `/directors/${director.id}/edit`

    return (
        <div>
            <p>Imię: {director.firstName}</p>
            <p>Nazwisko: {director.lastName}</p>
            <p>Wiek: {director.age}</p>
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
    const director = state.directors.find(director => director.id === id);
    const directorMovies = state.movies.filter(movie => movie.directorId === director.id)

    return {
        directors: state.directors,
        director,
        directorMovies
    }
}

export default connect(mapStateToProps, null)(DirectorsDetails);