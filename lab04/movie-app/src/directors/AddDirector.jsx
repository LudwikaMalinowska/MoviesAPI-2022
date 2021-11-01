import { connect } from "react-redux";
import {addDirectorAction} from "../actions/DirectorActions"
import { Formik, Field, Form} from "formik";
import {v4 as uuidv4 } from 'uuid';

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
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
            <label >Imię : </label>
            <Field name="firstName"></Field>

            <label >Nazwisko : </label>
            <Field name="lastName"></Field>

            <label >Wiek: </label>
            <Field name="age" type="number"></Field>
            
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