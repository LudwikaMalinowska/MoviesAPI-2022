import { connect } from "react-redux";

const EditDirector = () => {

    return (
        <div>EditDirector</div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

export default connect(mapStateToProps, null)(EditDirector);