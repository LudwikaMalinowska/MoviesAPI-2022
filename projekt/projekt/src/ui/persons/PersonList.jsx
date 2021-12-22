import { useEffect } from "react";
import { connect } from "react-redux";
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";



const PersonList = ({persons, getPersonList}, props) => {
    console.log("persons: ", persons);
    
    useEffect(() => {

        // if (persons.length === 0)
        getPersonList();
    }, []);

    return ( 
        <div>
            PersonList
        </div>
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