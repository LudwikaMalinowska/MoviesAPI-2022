import { connect } from "react-redux";
import { Link } from "react-router-dom";


const PersonDetails = ({person}, props) => {

    const editLink = `/persons/${person.id}/edit`
    const content = person ? (
        <div>
        <p>{person.first_name} {person.last_name}</p>
        <p>{person.id}</p>
        <p>{person.birth_date}</p>
        <p>{person.nationality}</p>

        <Link to={editLink}><button>Edytuj</button></Link>
        </div>
    ) : "Nie znaleziono osoby";

    return ( 
        <div>
        {content}
        <Link to="/persons"><button>Powrót do listy osób</button></Link>
        
        
        </div>
     );
}
 
const mapStateToProps = (state, props) => {
    // console.log(state);
    const id = props.match.params.id;
    return {
        person: state.entities.persons.byId[id]
    };
    
}

// const mapDispatchToProps = {
//     //tutaj edit
// }

export default connect(mapStateToProps, null)(PersonDetails);