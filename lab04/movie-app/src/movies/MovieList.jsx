import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import AddMovie from "./AddMovie";
import {deleteMovieAction} from '../actions/MovieActions';

const MovieList = (props) => {

    const movies = props.movies;
    const content = movies.map(movie =>{
        const toLink = `/movies/${movie.id}`
        return (
            <li className="movie" key={movie.id}>
                <p>{movie.title}</p>
                <p>{movie.productionYear}</p>
                <Link to={toLink}><button>Szczegóły</button></Link>
                <button onClick={() => props.deleteMovieAction(movie)}>Usuń</button>
            </li>
        )
    }
        )

    return (
        <div>
            <Link to="/movies/add"><button>Dodaj film</button></Link>
            <ul>
                {content}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = {
    deleteMovieAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);