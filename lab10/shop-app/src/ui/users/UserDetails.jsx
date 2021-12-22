import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initReactI18next, useTranslation } from 'react-i18next';

import { getUserList } from "../../ducks/users/operations";
import { useParams } from 'react-router-dom';



const UserDetails = ({user}, props) => {
    const { t } = useTranslation();

    console.log("user: ", user);
    const content = user ? (
    <li>
    <p>{t('name')}: {user.name.firstname} {user.name.lastname}</p>
    <p>{t('username')}: {user.username}</p>
    <p>{t('email')}: {user.email}</p>
    <p>{t('phone')}: {user.phone}</p>
    <div>
        <p>{t('address')}</p>
        <p>{t('city')}: {user.address.city}</p>
        <p>{t('street')}: {user.address.street} {user.address.number}</p>
        <p>{t('zipcode')}: {user.address.zipcode}</p>
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
        user: state.entities.users.byId[id],
        state
    };
}


export default connect(mapStateToProps, null)(UserDetails);