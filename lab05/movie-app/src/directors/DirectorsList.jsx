import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDirectorAction } from "../actions/DirectorActions";

const DirectorsList = (props) => {
    const directors = props.directors;
    
    const content = directors.map(director =>{
        const toLink = `/directors/${director.id}`
        return (
            <li className="director" key={director.id}>
                <p>{director.firstName} {director.lastName}</p>
                <p>Wiek: {director.age}</p>
                <Link to={toLink}><button>Szczegóły</button></Link>
                <button onClick={() => props.deleteDirectorAction(director)}>Usuń</button>
            </li>
        )
    }
        )

    return (
        <div>
            <Link to="/directors/add"><button>Dodaj reżysera</button></Link>
            <ul>
                {content}
            </ul>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

const mapDispatchToProps = {
    deleteDirectorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectorsList);