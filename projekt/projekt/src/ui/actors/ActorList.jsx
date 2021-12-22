import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getActorList } from '../../ducks/actors/operations';
import {getAllActors} from '../../ducks/actors/selectors';


const ActorList = ({actors, getActorList}, props) => {
    console.log("actors:", actors);
    useEffect(() => {
        

        // if (movies.length === 0)
        getActorList();
    }, []);

    const actorList = actors ? (actors.map(actor => {
        const actorLink = `/actors/${actor.id}`
        return (<li key={actor.id}>
            <p>{actor.first_name} {actor.last_name}</p>
            <Link to={actorLink}><button>Szczegóły</button></Link>

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
    // console.log(state);
    return {
        actors: getAllActors(state)
    };
    
}

const mapDispatchToProps = {
    getActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);