import { useEffect } from "react";
import { connect } from "react-redux";
import { getActorList } from '../../ducks/actors/operations';


const ActorList = ({actors, getActorList}, props) => {
    useEffect(() => {
        console.log("actors:", actors);

        // if (movies.length === 0)
        getActorList();
    }, []);

    return ( 
        <div>
            ActorList
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
    getActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);