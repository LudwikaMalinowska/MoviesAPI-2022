import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserList } from "../actions/UserActions";
import { useParams } from 'react-router-dom';



const UserDetails = ({user}, props) => {
    console.log("user: ", user);
    const content = user ? (
    <li>
    <p>name: {user.name.firstname} {user.name.lastname}</p>
    <p>username: {user.username}</p>
    <p>email: {user.email}</p>
    <p>phone: {user.phone}</p>
    <div>
        <p>Address</p>
        <p>city: {user.address.city}</p>
        <p>street: {user.address.street} {user.address.number}</p>
        <p>zipcode: {user.address.zipcode}</p>
    </div>
    </li>
    ) : null;
    
    // const content = null;
    return (
        <>
            {content}
        </>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.idUser;
    // const {id} = useParams();
    console.log(props);
    console.log(state);
    return {
        user: state.users.users.find(user => user.id === Number(id)),
        state
    };
}




export default connect(mapStateToProps, null)(UserDetails);