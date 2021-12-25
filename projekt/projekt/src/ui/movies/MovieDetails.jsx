import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../ducks/movies/operations";

const MovieDetails = ({movie, deleteMovie}, props) => {

    const handleDelete = () => {
        deleteMovie(movie);
        alert("usunięto");
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
        <p>Reżyser: {movie.director_id ? movie.director_id : "Brak danych"}</p>

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
    //console.log(id);
    return {
        movie: state.entities.movies.byId[id]
    };
    
}

const mapDispatchToProps = {
    deleteMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);