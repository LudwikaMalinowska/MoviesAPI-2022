import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getActorList } from '../../ducks/actors/operations';
import {getAllActors} from '../../ducks/actors/selectors';
import { getAllPersons } from "../../ducks/persons/selectors";
import { getPersonList } from '../../ducks/persons/operations';


const ActorList = ({actors, persons, getActorList, getPersonList}, props) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        
        if (actors.length === 0)
            getPersonList();
        if (actors.length === 0)
            getActorList();
    }, []);

    const actorList = actors ? (actors.map(actor => {
        const id = actor.person_id;
        const person = persons.find(person => person.id === id);
        const actorLink = `/persons/${actor.person_id}`
        return (<li key={actor.id}>
            <p>{person.first_name} {person.last_name}</p>
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
        persons: getAllPersons(state)
    };
    
}

const mapDispatchToProps = {
    getActorList,
    getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);