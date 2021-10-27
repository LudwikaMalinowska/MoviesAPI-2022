import { connect } from "react-redux";

const MovieDetails = () => {

    return (
        <div>MovieDetails</div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, null)(MovieDetails);