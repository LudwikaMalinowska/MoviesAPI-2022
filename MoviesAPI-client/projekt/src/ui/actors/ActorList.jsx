import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getActorList } from '../../ducks/actors/operations';
import {getAllActors} from '../../ducks/actors/selectors';
import { getAllPersons } from "../../ducks/persons/selectors";
import { getPersonList } from '../../ducks/persons/operations';
import { getMovieList } from '../../ducks/movies/operations';
import { getAllMovies } from '../../ducks/movies/selectors';


const ActorList = ({actors, movies, persons, getActorList, getMovieList, getPersonList}, props) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        
        if (persons.length <= 1)
            getPersonList();
        if (movies.length <= 1)
            getMovieList();
        
        getActorList();
        
    }, []);

    const actorList = actors ? (actors.map(actor => {
        const id = actor.person_id;
        const person = persons.find(person => person.id === id);
        const movie = movies.find(movie => movie.id === actor.movie_id)
        const actorLink = `/persons/${actor.person_id}`
        const movieLink = `/movies/${actor.movie_id}`
        return (<li key={actor.id}>
            <p>{person.first_name} {person.last_name}</p>
            <p className='movie-link'><Link to={movieLink}>{movie.title}</Link></p>
            <Link to={actorLink}><button>{t("details")}</button></Link>

        </li>
        )
    })
    ) : null;

    return ( 
        <ul>
            {actorList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    return {
        actors: getAllActors(state),
        persons: getAllPersons(state),
        movies: getAllMovies(state)
    };
    
}

const mapDispatchToProps = {
    getActorList,
    getPersonList,
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);