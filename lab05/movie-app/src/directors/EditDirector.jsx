import { connect } from "react-redux";
import { editDirectorAction } from "../actions/DirectorActions";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    firstName: Yup.string().required("Imię jest wymagane"),
    lastName: Yup.string().required("Nazwisko jest wymagane"),
    age: Yup.number()
    .min(10)
    .max(99)
    .required("Wiek jest wymagany")
})

const EditDirector = (props) => {
    // console.log(props);
    const director = props.director; 
    // console.log(props);
    // console.log(director);

    const initialValues = {
        firstName: director.firstName,
        lastName: director.lastName,
        age: director.age
    }
    const handleSubmit = (values) => {
        
        // console.log(values);
        const editedDirector = {
            ...director,
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age
        }
        // console.log(editedDirector);
        props.editDirectorAction(editedDirector);
        window.history.back()
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
            
            <button type="submit">Zatwierdź</button>
        </Form>
        </Formik>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    // console.log("id: ", id);
    // console.log(props);
    const director = state.directors.find(director => director.id === id)
    // console.log(director);
    return {
        directors: state.directors,
        movies: state.movies,
        director
    }
}

const mapDispatchToProps = {
    editDirectorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDirector);