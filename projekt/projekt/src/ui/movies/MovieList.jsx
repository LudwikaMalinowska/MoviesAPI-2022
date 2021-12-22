import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMovieList } from "../../ducks/movies/operations";
import { getAllMovies } from "../../ducks/movies/selectors";

const MovieList = ({movies, getMovieList}, props) => {
    console.log("movies:", movies);

    useEffect(() => {

        // if (movies.length === 0)
        getMovieList();
    }, []);

    const movieList = movies ? (movies.map(movie => {
        const movieLink = `/movies/${movie.id}`
        return (<li key={movie.id}>
            <p>{movie.title}</p>
            <Link to={movieLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    return ( 
        <ul>
            {movieList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        movies: getAllMovies(state)
    };
    
}

const mapDispatchToProps = {
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);