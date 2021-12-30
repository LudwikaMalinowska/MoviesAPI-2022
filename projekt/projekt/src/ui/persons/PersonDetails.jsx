import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initReactI18next, useTranslation } from 'react-i18next';
import { getActorList } from "../../ducks/actors/operations";
import { getAllActors } from "../../ducks/actors/selectors";
import { getMovieList } from "../../ducks/movies/operations";
import { deletePerson } from "../../ducks/persons/operations";
import {getAllMovies} from "../../ducks/movies/selectors";



const PersonDetails = ({person, actors, movies, deletePerson}, props) => {
    const { t } = useTranslation();

    useEffect(() => {
        getActorList();
        getMovieList();
    }, []);

    const handleDelete = () => {
        deletePerson(person);
        alert("usunięto")
    }

    

    const directorIn = () => {
        // console.log("movies: ", movies);
        const moviesDirected = movies.filter(movie => {
            
            const isDir = movie.director_id ? 
            (movie.director_id === person.id)
            : false;

            return isDir;
        })
        // console.log("movies directed: ", moviesDirected);

        const moviesLiElements = moviesDirected.map(movie => {
            const toLink = `/movies/${movie.id}`
            return (
                <li><Link to={toLink}>{movie.title}</Link></li>
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
                <li><Link to={toLink}>{movie.title}</Link></li>
            )
        } )
        // console.log(moviesIn);

        return (<ul>{moviesLiElements}</ul>)
    }

    const editLink = `/persons/${person.id}/edit`
    const content = person ? (
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
        
    ) : `${t("person_not_found")}`;
    
    return ( 
        <div>
        {content}
        <Link to="/persons"><button>{t("back_to_persons")}</button></Link>
        
        
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.id;
    return {
        person: state.entities.persons.byId[id],
        movies: getAllMovies(state),
        actors: getAllActors(state)
    };
    
}

const mapDispatchToProps = {
    deletePerson,
    getMovieList,
    getActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);