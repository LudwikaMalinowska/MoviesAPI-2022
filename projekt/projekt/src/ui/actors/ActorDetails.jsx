import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ActorDetails = ({actor}, props) => {
    const content = actor ? (
        <div>
            <p>{actor.first_name} {actor.last_name}</p>
            <p>{actor.id}</p>
            <p>{actor.birth_date}</p>
            <p>{actor.nationality}</p>
            <button>Edytuj</button>
        </div>
    ): "Nie znaleziono aktora";
    return ( 
        <div>
        {content}
        
        <Link to="/actors"><button>Powrót do listy aktorów</button></Link>
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.id;
    return {
        actor: state.entities.actors.byId[id]
    };
    
}

// const mapDispatchToProps = {
//     //tutaj edit
// }

export default connect(mapStateToProps, null)(ActorDetails);