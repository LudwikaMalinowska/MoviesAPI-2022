import { useEffect } from "react";
import { connect } from "react-redux";
import { getMovieList } from "../../ducks/movies/operations";
import { getAllMovies } from "../../ducks/movies/selectors";

const MovieList = ({movies, getMovieList}, props) => {
    console.log("movies:", movies);
    
    useEffect(() => {

        // if (movies.length === 0)
        getMovieList();
    }, []);

    return ( 
        <div>
            MovieList
        </div>
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