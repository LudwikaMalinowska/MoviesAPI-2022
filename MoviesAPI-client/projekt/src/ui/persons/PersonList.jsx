import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getPersonList } from "../../ducks/persons/operations";
import { getAllPersons } from "../../ducks/persons/selectors";

import Pagination from "../core/Pagination";

const PersonList = ({persons, getPersonList}, props) => {
    const { t } = useTranslation();
    
    const [displayedPersons, setDisplayedPersons] = useState(persons);
    const [filterOn, setFilterOn] = useState(false);
    const personContent = filterOn ? displayedPersons : persons;

    const inputEl = useRef(null);
    const selectEl = useRef(null);
    const sortSelectEl = useRef(null);

    const selectDateEl = useRef(null);
    const inputDate1El = useRef(null);
    const inputDate2El = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Get current movies
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPersons = personContent.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

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

    
    const personList = currentPersons ? (currentPersons.map(person => {
        const personLink = `/persons/${person.id}`
        return (<li key={person.id}>
            <p>{person.first_name} {person.last_name}</p>
            <p>{person.birth_date.substring(0, 10)}</p>
            <Link to={personLink}><button>{t("details")}</button></Link>

        </li>
        )
    })
    ) : null;

    
    const handleInputChange = (persons) => {
        const inputValue = inputEl.current.value.toLowerCase();
        let newPersons = persons.filter(person => {
            const name = `${person.first_name} ${person.last_name}`.toLowerCase();
            return name.includes(inputValue);
        })
        
        return newPersons;      
    }

    

    const handleSelectChange = (persons) => {
        const selectValue = selectEl.current.value;
        let newPersons = persons.filter(person => person.nationality === selectValue);

        return newPersons;
    }

    const handleDateSelectChange = () => {
        const selectValue = selectDateEl.current.value;
        switch (selectValue) {
            case "date-before":
                inputDate2El.current.className = "hidden"
                break;
            case "date-after":
                inputDate2El.current.className = "hidden"
                break;
            case "date-between":
                inputDate2El.current.className = "visible"
                break;
            default:
                break;
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

        
        return newPersons;
    }

    const filter = () => {
        setFilterOn(true);
        const selectNationalityValue = selectEl.current.value;
        const inputTextValue = inputEl.current.value.toLowerCase();
        const dateInputValue = inputDate1El.current.value;

        let newPersons = persons;
        if (selectNationalityValue !== "all"){
            newPersons = handleSelectChange(newPersons);
        } 

        if (inputTextValue !== ""){
            newPersons = handleInputChange(newPersons);
        } 

        if (dateInputValue !== ""){
            newPersons = handleDateFilter(newPersons);
        } 

        setDisplayedPersons(newPersons);
    }

    const handleSortChange = () => {
        setFilterOn(true);
        const sortValue = sortSelectEl.current.value;

        let sortedPersons = [...displayedPersons];
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

        setDisplayedPersons(sortedPersons);
    }

    return ( 
        <div className="persons">
            
            
            <Link to="persons/add"><button>{t("add_new_person")}</button></Link>

            <div>
            {t("nationality")}: 
            <select name="nationality" id="nationality"
            onChange={filter}
            ref={selectEl}
            >
            <option value="all" key="all">{t("all_nationalities")}</option>
                {selectOptions}
            </select>
            </div>
            

            <div className="date-filters">

                <select name="date-filter" id="date-filter"
                onChange={handleDateSelectChange}
                ref={selectDateEl}
                >
                    <option value="date-before">{t("older_than")}</option>
                    <option value="date-after">{t("younger_than")}</option>
                    <option value="date-between">{t("birth_date_between")}</option>
                </select>
                <input type="date" ref={inputDate1El}/> 

                <input id="date2" className="hidden" type="date" ref={inputDate2El}/> 
                {/* display hidden */}
                <button 
                onClick={filter}
                >{t("filter")}</button>

            </div>


            <br/>
            {t("search")}: <input type="text" 
            ref={inputEl}
                onChange={filter}
            />

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

            <ul className="personList">
                {personList}
            </ul>

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={personContent.length}
                paginate={paginate}
                endpoint="/persons#"
            />
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return {
        persons: getAllPersons(state)
    };
    
}

const mapDispatchToProps = {
    getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);