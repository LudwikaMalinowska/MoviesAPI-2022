import { useEffect } from "react";
import { connect } from "react-redux";
import { getPersonList } from "../../ducks/persons/operations";



const PersonList = ({persons, getPersonList}, props) => {
    useEffect(() => {
        console.log("persons: ", persons);

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
        state: state,
    };
    
}

const mapDispatchToProps = {
    getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);