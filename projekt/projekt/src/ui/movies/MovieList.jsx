import { useEffect } from "react";
import { connect } from "react-redux";
import { getMovieList } from "../../ducks/movies/operations";

const MovieList = ({movies, getMovieList}, props) => {
    useEffect(() => {
        console.log("movies:", movies);

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
        state: state,
    };
    
}

const mapDispatchToProps = {
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);