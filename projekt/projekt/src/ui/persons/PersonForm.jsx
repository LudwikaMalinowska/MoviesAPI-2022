import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {getAllPersons} from "../../ducks/persons/selectors";
import {createPerson} from "../../ducks/persons/operations";


const personSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    nationality: Yup.string().required(),
    birth_date: Yup.date().required(),
})


const PersonForm = (props) => {
    const initialValues = {
        id: uuidv4(),
        first_name: "",
        last_name: "",
        birth_date: "2021-01-01",
        nationality: "",
    }
    const handleSubmit = (values) => {
        props.createPerson(values);
        // window.history.back();
    }

    return ( 
        <Formik
            initialValues={initialValues}
            validationSchema={personSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
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
        </Form>
        </Formik>
     );
}
 
const mapStateToProps = (state) => {
    return {
        persons: getAllPersons(state)
    }
}

const mapDispatchToProps = {
    createPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);