import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";



const PersonList = ({persons, getPersonList}, props) => {
    // console.log("persons: ", persons);
    const { t } = useTranslation();
    const [displayedPersons, setDisplayedPersons] = useState(persons);
    const [filterOn, setFilterOn] = useState(false);
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

        if (persons.length <= 1)
            getPersonList();
    }, []);

    const personContent = filterOn ? displayedPersons : persons;
    const personList = personContent ? (personContent.map(person => {
        const personLink = `/persons/${person.id}`
        return (<li key={person.id}>
            <p>{person.first_name} {person.last_name}</p>
            <p>{person.birth_date.substring(0, 10)}</p>
            <Link to={personLink}><button>{t("details")}</button></Link>

        </li>
        )
    })
    ) : null;

    const handleInputChange = () => {
        setFilterOn(true);
        const inputValue = inputEl.current.value.toLowerCase();
        
        if (inputValue !== "") {
            const newPersons = persons.filter(person => {
                const f_name_ok = person.first_name
                .toLowerCase().includes(inputValue)
                const l_name_ok = person.last_name
                .toLowerCase().includes(inputValue)
    
                return f_name_ok || l_name_ok;
            })
    
            setDisplayedPersons(newPersons);
        } else {

            setFilterOn(false);
            setDisplayedPersons(persons);
        }
        
        
    }

    const handleSelectChange = () => {
        const value = selectEl.current.value;

        if (value !== "all") {
            setFilterOn(true);
            const newPersons = persons.filter(person => person.nationality === value);
            setDisplayedPersons(newPersons);
        } else {
            setFilterOn(false);
            setDisplayedPersons(persons);
        }
        
    }

    const handleDateFilter = () => {
        setFilterOn(true);
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
        setFilterOn(true);
        const sortValue = sortSelectEl.current.value;

        let sortedPersons = [...persons];
        switch (sortValue){
            case "dont-sort":
                sortedPersons = persons;
                setFilterOn(false);
                break;
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
            
            
            <Link to="persons/add"><button>{t("add_new_person")}</button></Link>

            <div>
            {t("nationality")}: 
            <select name="nationality" id="nationality"
            onChange={handleSelectChange}
            ref={selectEl}
            >
            <option value="all" key="all">{t("all_nationalities")}</option>
                {selectOptions}
            </select>
            </div>
            

            <div className="date-filters">

                <select name="date-filter" id="date-filter"
                ref={selectDateEl}
                >
                    <option value="date-before">{t("older_than")}</option>
                    <option value="date-after">{t("younger_than")}</option>
                    <option value="date-between">{t("birth_date_between")}</option>
                </select>
                <input type="date" ref={inputDate1El}/> 

                <input type="date" ref={inputDate2El}/> 
                {/* display hidden */}
                <button onClick={handleDateFilter}>{t("filter")}</button>

            </div>


            <br/>
            {t("search")}: <input type="text" 
            ref={inputEl}
            onChange={handleInputChange}/>

            {t("sort")}: <select name="sort" id="sort"
            ref={sortSelectEl}
            onChange={handleSortChange}
            >
                <option value="dont-sort">{t("dont_sort")}</option>
                <option value="sort-alphabetic">{t("sort_alphabetically")}</option>
                <option value="sort-alphabetic-reverse">{t("sort_alphabetically_reverse")}</option>
                <option value="sort-date">{t("sort_date")}</option>
                <option value="sort-date-reverse">{t("sort_date_reverse")}</option>
                <option value="sort-id">{t("sort_id")}</option>
                <option value="sort-id-reverse">{t("sort_id_reverse")}</option>
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