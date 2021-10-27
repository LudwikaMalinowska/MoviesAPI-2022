import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DirectorsList = () => {

    return (
        <div>DirectorsList
            <br />
            <Link to="directors/add">Dodaj reżysera</Link>
            <br />
            <Link to="directors/1">Szczegóły</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

export default connect(mapStateToProps, null)(DirectorsList);