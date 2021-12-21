import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserList } from "../../ducks/users/operations";
import UserDetails from "./UserDetails";
import {getAllUsers} from "../../ducks/users/selectors";

const UserList = ({ users, getUserList, loading }, props) => {
// const UserList = (props) => {
    useEffect(() => {
        getUserList();
    }, []);

    // const users = props.users;
    // console.log("users: ", users);
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
    // console.log("bbb:", state);
    return {
        users: getAllUsers(state),
        // loading: state.users.loading
    };
    
}

const mapDispatchToProps = {
    getUserList,
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);