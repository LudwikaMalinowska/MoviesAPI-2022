import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserList } from "../actions/UserActions";
import UserDetails from "./UserDetails";

const UserList = ({ users, getUserList, loading }, props) => {
// const UserList = (props) => {
    useEffect(() => {
        getUserList();
    }, []);

    // const users = props.users;
    const userList = users ?  (users.map(user => {
        // console.log(user)
        const userLink = `/users/${user.id}`
        return (<li key={user.id}>
            <p>{user.name.firstname} {user.name.lastname}</p>
            <Link to={userLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    return (
    <ul>
        {userList}
    </ul>
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