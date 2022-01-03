import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getActorList } from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import { getMovieList, editMovie } from "../../ducks/movies/operations";
import { deletePerson, getPerson } from "../../ducks/persons/operations";
import {getAllMovies} from "../../ducks/movies/selectors";



const PersonDetails = ({person, actors, movies, deletePerson, getPerson, personId, getMovieList, getActorList, editMovie}, props) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (person === undefined)
            getPerson(personId);

        getActorList();
        getMovieList();
    }, []);

    const handleDelete = () => {
        const moviesDirected = findDirectedMovies(movies);
        for (const movie of moviesDirected) {
            const updatedMovie = {
                ...movie,
                director_id: null
            }
            //edit movie PUT
            editMovie(updatedMovie);
        }
        deletePerson(person);
        alert("usunięto")
    }

    const findDirectedMovies = (movies) => movies.filter(movie => {
            
        const isDir = movie.director_id ? 
        (movie.director_id === person.id)
        : false;

        return isDir;
    })

    

    const directorIn = () => {
        // console.log("movies: ", movies);
        const moviesDirected = findDirectedMovies(movies);
        // console.log("movies directed: ", moviesDirected);

        const moviesLiElements = moviesDirected.map(movie => {
            const toLink = `/movies/${movie.id}`
            return (
                <li key={movie.id}><Link to={toLink}>{movie.title}</Link></li>
            )
        })

        return (<ul>{moviesLiElements}</ul>)
    }

    const actorIn = () => {
        const actorData = actors.filter(actor => actor.person_id === person.id);
        // console.log(actorData);
        const moviesIn = movies.filter(movie => {
            for (const data of actorData){
                if (data.movie_id === movie.id)
                    return true;
            }
            return false;
        });
        
        const moviesLiElements = moviesIn.map(movie =>{
            const toLink = `/movies/${movie.id}`
            return (
                <li key={movie.id}><Link to={toLink}>{movie.title}</Link></li>
            )
        } )
        // console.log(moviesIn);

        return (<ul>{moviesLiElements}</ul>)
    }

    const contentEl = (person) => {
    const editLink = `/persons/${person.id}/edit`
    const content = (
        <div>
        <p>{person.first_name} {person.last_name}</p>
        <p>{person.id}</p>
        <p>{person.birth_date}</p>
        <p>{person.nationality}</p>

        <ul>
            {t("director_in")}:
            {directorIn()}
        </ul>
        <ul>
            {t("actor_in")}:
            {actorIn()}

        </ul>

        <Link to={editLink}><button>{t("edit")}</button></Link>
        <button onClick={handleDelete}>{t("delete")}</button>
        </div>
        
    );

    return content
    }
    
    return ( 
        <div>
        {person ? contentEl(person) : "Nie znaleziono osoby"}
        <div>
            <Link to="/persons"><button>{t("back_to_persons")}
        </button></Link>
        </div>
        
        
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.id;
    return {
        person: state.entities.persons.byId[id],
        movies: getAllMovies(state),
        actors: getAllActors(state),
        personId: id
    };
    
}

const mapDispatchToProps = {
    deletePerson,
    getMovieList,
    getActorList,
    getPerson,
    editMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);