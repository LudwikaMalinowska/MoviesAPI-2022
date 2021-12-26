import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";



const PersonList = ({persons, getPersonList}, props) => {
    console.log("persons: ", persons);
    const [displayedPersons, setDisplayedPersons] = useState(persons);
    const inputEl = useRef(null);
    const selectEl = useRef(null);
    

    let nationalities = persons.map(person => person.nationality);
    nationalities = [...new Set(nationalities)];
    const selectOptions = nationalities.map(nationality =>
        (
            <option value={nationality}>{nationality}</option>
        ))

    useEffect(() => {

        // if (persons.length === 0)
        getPersonList();
    }, []);

    const personList = displayedPersons ? (displayedPersons.map(person => {
        const personLink = `/persons/${person.id}`
        return (<li key={person.id}>
            <p>{person.first_name} {person.last_name}</p>
            <Link to={personLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    const handleInputChange = () => {
        const inputValue = inputEl.current.value.toLowerCase();
        
        const newPersons = persons.filter(person => {
            const f_name_ok = person.first_name
            .toLowerCase().includes(inputValue)
            const l_name_ok = person.last_name
            .toLowerCase().includes(inputValue)

            return f_name_ok || l_name_ok;
        })

        setDisplayedPersons(newPersons);
        
    }

    const handleSelectChange = () => {
        const value = selectEl.current.value;
        const newPersons = persons.filter(person => person.nationality === value);

        setDisplayedPersons(newPersons);
    }

    return ( 
        <ul>
            
            
            <Link to="persons/add"><button>Dodaj nowa osobę</button></Link>

            <select name="nationality" id="nationality"
            onChange={handleSelectChange}
            ref={selectEl}
            >
                {selectOptions}
            </select>


            <br/>
            Szukaj: <input type="text" 
            ref={inputEl}
            onChange={handleInputChange}/>
            {personList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        persons: getAllPersons(state)
    };
    
}

const mapDispatchToProps = {
    getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);