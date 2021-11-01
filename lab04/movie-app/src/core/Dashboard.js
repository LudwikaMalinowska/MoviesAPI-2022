import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {

    const movies = [...props.movies];
    // console.log(props.movies);
    const m = movies.sort((m1, m2) => m2.productionYear - m1.productionYear)
    // console.log(m);
    const recentMovies = m.slice(0,3)
    // console.log(recentMovies);
    
    const movieBoard = recentMovies.map(movie => (
        <div className="movie" key={movie.id}>
            <p>{movie.title}</p>
            <p>{movie.productionYear}</p>
            <Link to={`/movies/${movie.id}`}><button>Szczegóły</button></Link>
        </div>
    ))
    return (
        <div>Dashboard
        <div>{movieBoard}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        directors: state.directors
    }
}

export default connect(mapStateToProps, null)(Dashboard);