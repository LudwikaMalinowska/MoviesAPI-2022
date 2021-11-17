import { useEffect } from "react";
import { connect } from "react-redux";
import { getUserList } from "../actions/UserActions";

const UserList = ({ users, getUserList, loading }, props) => {
    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div>
            User List
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        loading: state.users.loading
    };
}

const mapDispatchToProps = {
    getUserList
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);