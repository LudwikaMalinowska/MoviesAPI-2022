import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {getAllPersons} from "../../ducks/persons/selectors";
import {createPerson, editPerson} from "../../ducks/persons/operations";


const personSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    nationality: Yup.string().required(),
    birth_date: Yup.date().required(),
})


const PersonForm = ({person, createPerson, editPerson}, props) => {
    const initialValues = person ? ({
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        birth_date: person.birth_date.substring(0, 10),
        nationality: person.nationality,
    }) :
    ({
        id: uuidv4(),
        first_name: "",
        last_name: "",
        birth_date: "2021-01-01",
        nationality: "",
    })
    const handleSubmit = (values) => {

        if (person) {
            editPerson(values)
            alert("Edytowano")
        } else {
            createPerson(values);
            alert("dodano")
        }
        
        // window.history.back();
    }

    return ( 
        <Formik
            initialValues={initialValues}
            validationSchema={personSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
        <div>
        <label >Imię : </label>
            <Field name="first_name"></Field>
            <ErrorMessage name="first_name" component="div"/>

            <label >Nazwisko: </label>
            <Field name="last_name" type="text"></Field>
            <ErrorMessage name="last_name" component="div"/>

            <label >Nationality: </label>
            <Field name="nationality" type="text"></Field>
            <ErrorMessage name="nationality" component="div"/>

            <label >Data urodzenia: </label>
            <Field name="birth_date" type="date"></Field>
            <ErrorMessage name="birth_date" component="div"/>

            
            <button type="submit">Dodaj</button>
        </div>

        <Link to="/persons"><button>Powrót do listy osób</button></Link>
            
        </Form>
        </Formik>
     );
}
 
const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const person = id ? state.entities.persons.byId[id] :
    null;
    return {
        persons: getAllPersons(state),
        person: person
    }
}

const mapDispatchToProps = {
    createPerson,
    editPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);