import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteActorAction } from "../actions/ActorActions";

const ActorList = (props) => {
    const actors = props.actors;
    
    const content = actors.map(actor =>{
        const toLink = `/actor/${actor.id}`
        return (
            <li className="actor" key={actor.id}>
                <p>{actor.firstName} {actor.lastName}</p>
                <p>Wiek: {actor.age}</p>
                <Link to={toLink}><button>Szczegóły</button></Link>
                <button onClick={() => props.deleteActorAction(actor)}>Usuń</button>
            </li>
        )
    }
        )

    return (
        <div>
            <Link to="/actors/add"><button>Dodaj aktora</button></Link>
            <ul>
                {content}
            </ul>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors
    }
}

const mapDispatchToProps = {
    deleteActorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);