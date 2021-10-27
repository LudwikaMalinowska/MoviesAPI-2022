import { connect } from "react-redux";
import {addMovieAction} from "../actions/MovieActions";

const AddMovie = () => {

    return (
        <div>AddMovie</div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = {
    addMovieAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);