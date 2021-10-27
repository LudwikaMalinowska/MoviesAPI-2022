import { connect } from "react-redux";
import {addDirectorAction} from "../actions/DirectorActions"

const AddDirector = () => {

    return (
        <div>AddDirector</div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

const mapDispatchToProps = {
    addDirectorAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDirector);