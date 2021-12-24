import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MovieDetails = ({movie}, props) => {

    const editLink = `/movies/${movie.id}/edit`
    const content = movie ? (
        <div>
            <p>{movie.title}</p>
        <img src={movie.image_url} alt={movie.title}/>
        <p>{movie.description}</p>
        <p>{movie.release_date}</p>
        <p>{movie.genre}</p>
        <p>{movie.id}</p>
        <p>Reżyser: {movie.director_id ? movie.director_id : "Brak danych"}</p>

        <Link to={editLink}><button>Edytuj</button></Link>
        
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

// const mapDispatchToProps = {
//     //tutaj edit
// }

export default connect(mapStateToProps, null)(MovieDetails);