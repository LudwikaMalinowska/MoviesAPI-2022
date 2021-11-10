import { connect } from "react-redux";
import {addDirectorAction} from "../actions/DirectorActions"
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    firstName: Yup.string().required("Imię jest wymagane"),
    lastName: Yup.string().required("Nazwisko jest wymagane"),
    age: Yup.number()
    .min(10)
    .max(99)
    .required("Wiek jest wymagany")
})

const AddDirector = (props) => {
    const initialValues = {
        id: uuidv4(),
        firstName: "",
        lastName: "",
        age: 0
    }
    const handleSubmit = (values) => {
        props.addDirectorAction(values);
        window.history.back();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
            <label >Imię : </label>
            <Field name="firstName"></Field>
            <ErrorMessage name="firstName" component="div"/>

            <label >Nazwisko : </label>
            <Field name="lastName"></Field>
            <ErrorMessage name="lastName" component="div"/>

            <label >Wiek: </label>
            <Field name="age" type="number"></Field>
            <ErrorMessage name="age" component="div"/>
            
            <button type="submit">Dodaj</button>
        </Form>
        </Formik>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

const mapDispatchToProps = {
    addDirectorAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDirector);