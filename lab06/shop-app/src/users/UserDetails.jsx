import { useEffect } from "react";
import { connect } from "react-redux";
import { getUserList } from "../actions/UserActions";


const UserDetails = (props) => {

    return (
        <div>
            UserDetils
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    };
}




export default connect(mapStateToProps, null)(UserDetails);