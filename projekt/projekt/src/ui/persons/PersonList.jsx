import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";



const PersonList = ({persons, getPersonList}, props) => {
    // console.log("persons: ", persons);
    const [displayedPersons, setDisplayedPersons] = useState(persons);
    const inputEl = useRef(null);
    const selectEl = useRef(null);
    const sortSelectEl = useRef(null);

    const selectDateEl = useRef(null);
    const inputDate1El = useRef(null);
    const inputDate2El = useRef(null);
    

    let nationalities = persons.map(person => person.nationality);
    nationalities = [...new Set(nationalities)];
    const selectOptions = nationalities.map(nationality =>
        (
            <option value={nationality} key={nationality}>{nationality}</option>
        ))

    useEffect(() => {

        // if (persons.length === 0)
            getPersonList();
    }, []);

    const personList = displayedPersons ? (displayedPersons.map(person => {
        const personLink = `/persons/${person.id}`
        return (<li key={person.id}>
            <p>{person.first_name} {person.last_name}</p>
            <p>{person.birth_date.substring(0, 10)}</p>
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

    const handleDateFilter = () => {
        const selectValue = selectDateEl.current.value;
        const inputDate1 = new Date(inputDate1El.current.value);
        let newPersons = displayedPersons;

        switch (selectValue) {
            case "date-before":
                newPersons = persons.filter(person => {
                    const personDate = new Date(person.birth_date);

                    return personDate.getTime() < inputDate1.getTime()
                })

                break;
            case "date-after":
                newPersons = persons.filter(person => {
                    const personDate = new Date(person.birth_date);

                    return personDate.getTime() > inputDate1.getTime()
                })

                break;
            case "date-between":
                newPersons = persons.filter(person => {
                    const personDate = new Date(person.birth_date);
                    const inputDate2 = new Date(inputDate2El.current.value);

                    const afterDate1 = personDate.getTime() > inputDate1.getTime();
                    const beforeDate2 = personDate.getTime() < inputDate2.getTime();

                    return afterDate1 && beforeDate2;
                })
                break;
            default:
                break;
        }

        console.log("newPersons:", newPersons);

        setDisplayedPersons(newPersons);

    }

    const handleSortChange = () => {
        const sortValue = sortSelectEl.current.value;

        const sortedPersons = [...persons];
        switch (sortValue){
            case "sort-alphabetic":
                sortedPersons.sort((person1, person2) => {
                    const name1 = `${person1.first_name} ${person1.last_name}`;
                    const name2 = `${person2.first_name} ${person2.last_name}`;

                    return name1.localeCompare(name2)
                })
                break;
            case "sort-alphabetic-reverse":
                sortedPersons.sort((person1, person2) => {
                    const name1 = `${person1.first_name} ${person1.last_name}`;
                    const name2 = `${person2.first_name} ${person2.last_name}`;

                    return name1.localeCompare(name2)
                })

                sortedPersons.reverse();
                break;
            case "sort-date":
                sortedPersons.sort((person1, person2) => {
                    const date1 = new Date(person1.birth_date);
                    const date2 = new Date(person2.birth_date);

                    return date1.getTime() - date2.getTime();
                });
                break;
            case "sort-date-reverse":
                sortedPersons.sort((person1, person2) => {
                    const date1 = new Date(person1.birth_date);
                    const date2 = new Date(person2.birth_date);

                    return date2.getTime() - date1.getTime();
                });
                break;
            case "sort-id":
                sortedPersons.sort((person1, person2) => person1.id - person2.id);
                break;
            case "sort-id-reverse":
                sortedPersons.sort((person1, person2) => person2.id - person1.id);
                break;
            default:
                break;
        }

        console.log("sorted:", sortedPersons);
        setDisplayedPersons(sortedPersons);
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

            <div className="date-filters">

                <select name="date-filter" id="date-filter"
                ref={selectDateEl}
                >
                    <option value="date-before">Osoby starsze niż</option>
                    <option value="date-after">Osoby młodsze niż</option>
                    <option value="date-between">Data urodzenia pomiędzy</option>
                </select>
                <input type="date" ref={inputDate1El}/> 

                <input type="date" ref={inputDate2El}/> 
                {/* display hidden */}
                <button onClick={handleDateFilter}>Filtruj</button>

            </div>


            <br/>
            Szukaj: <input type="text" 
            ref={inputEl}
            onChange={handleInputChange}/>

            Sortuj: <select name="sort" id="sort"
            ref={sortSelectEl}
            onChange={handleSortChange}
            >
                <option value="sort-alphabetic">Alfabetycznie A-Z</option>
                <option value="sort-alphabetic-reverse">Alfabetycznie Z-A</option>
                <option value="sort-date">Według daty - rosnąco</option>
                <option value="sort-date-reverse">Według daty - malejąco</option>
                <option value="sort-id">Według id - rosnąco</option>
                <option value="sort-id-reverse">Według id - malejąco</option>
            </select>

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