import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";



const PersonList = ({persons, getPersonList}, props) => {
    console.log("persons: ", persons);

    useEffect(() => {

        // if (persons.length === 0)
        getPersonList();
    }, []);

    const personList = persons ? (persons.map(person => {
        const personLink = `/persons/${person.id}`
        return (<li key={person.id}>
            <p>{person.first_name} {person.last_name}</p>
            <Link to={personLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    return ( 
        <ul>
            <Link to="persons/add"><button>Dodaj nowa osobę</button></Link>
            {personList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        persons: getAllPersons(state)
    };
    
}

const mapDispatchToProps = {
    getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);