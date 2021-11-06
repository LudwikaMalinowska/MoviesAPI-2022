import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {

    const movies = [...props.movies];
    // console.log(props.movies);
    const m = movies.sort((m1, m2) => m2.productionYear - m1.productionYear)
    // console.log(m);
    const recentMovies = m.slice(0,3)
    // console.log(recentMovies);
    const movies2 = [...props.movies];
    const mm = movies2.sort((m1,m2) => m2.actorIds.length - m1.actorIds.length)
    const mostActorMovies = mm.slice(0,3)

    const a = [...props.actors];
    a.sort((a1, a2) => a2.movieIds.length - a1.movieIds.length)
    const actorInMostMovies = a.slice(0,3)
    // console.log("actors: ", actors); //ok
    console.log("a:", a);

    
    const movieBoard = recentMovies.map(movie => (
        <div className="movie" key={movie.id}>
            <p>{movie.title} - {movie.productionYear} </p>
            <Link to={`/movies/${movie.id}`}><button>Szczegóły</button></Link>
        </div>
    ))

    const mostActorMoviesBoard = mostActorMovies.map(movie => (
        <div className="movie" key={movie.id}>
            <p>{movie.title} - {movie.productionYear} - {movie.actorIds.length} aktorów</p>
            <Link to={`/movies/${movie.id}`}><button>Szczegóły</button></Link>
        </div>
    ))

    const actorsInMoviesBoard = actorInMostMovies.map(actor => (
        <div className="actor" key={actor.id}>
            <p>{actor.firstName} {actor.lastName} - {actor.movieIds.length} filmy </p>
            <Link to={`/actors/${actor.id}`}><button>Szczegóły</button></Link>
        </div>
    ))
    return (
        <div>
        <h3>Najnowsze filmy: </h3>
        <div>{movieBoard}</div>
        <h3>Filmy z największą ilością aktorów</h3>
        <div>{mostActorMoviesBoard}</div>
        <h3>Aktorzy z największą liczbą filmów w karierze</h3>
        <div>{actorsInMoviesBoard}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        directors: state.directors,
        actors: state.actors
    }
}

export default connect(mapStateToProps, null)(Dashboard);