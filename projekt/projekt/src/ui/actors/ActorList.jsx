import { useEffect } from "react";
import { connect } from "react-redux";
import { getActorList } from '../../ducks/actors/operations';
import {getAllActors} from '../../ducks/actors/selectors';


const ActorList = ({actors, getActorList}, props) => {
    console.log("actors:", actors);
    useEffect(() => {
        

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
        actors: getAllActors(state)
    };
    
}

const mapDispatchToProps = {
    getActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);