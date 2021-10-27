import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MovieList = () => {

    return (
        <div>MovieList
            <br />
            <Link to="movies/add">Dodaj film</Link>
            <br />
            <Link to="movies/1">Szczegóły</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, null)(MovieList);