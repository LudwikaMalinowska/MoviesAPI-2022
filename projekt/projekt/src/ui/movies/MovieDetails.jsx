import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../ducks/movies/operations";


const MovieDetails = ({movie, persons, deleteMovie}, props) => {

    const handleDelete = () => {
        deleteMovie(movie);
        alert("usunięto");
    }

    let movieDirectorLink = "Brak danych";
    if (movie.director_id) {
        const director = persons.byId[movie.director_id];
        console.log("director: ", director);
        const linkTo = `/persons/${director.id}`;
        movieDirectorLink = (
        <Link to={linkTo}>
        {director.first_name} {director.last_name}
        </Link>
        );
    }
    

    const editLink = `/movies/${movie.id}/edit`
    let content = movie ? (
        <div>
            <p>{movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{movie.description}</p>
        <p>{movie.release_date}</p>
        <p>{movie.genre}</p>
        <p>{movie.id}</p>
        <p>Reżyser: {movieDirectorLink}</p>

        <Link to={editLink}><button>Edytuj</button></Link>
        <button onClick={handleDelete}>Usuń</button>
        
        </div>
    ) : "Nie znaleziono filmu";

    return ( 
        <div>
        
        {content}
        
        <Link to ="/movies"><button>Powrót do listy filmów</button></Link>
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.idMovie;
    
    return {
        movie: state.entities.movies.byId[id],
        persons: state.entities.persons
    };
    
}

const mapDispatchToProps = {
    deleteMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);