import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DirectorsDetails = (props) => {

    const id = props.match.params.id;
    return (
        <div>DirectorsDetails
            <br />
            <Link to="/directors/1/edit"/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

export default connect(mapStateToProps, null)(DirectorsDetails);