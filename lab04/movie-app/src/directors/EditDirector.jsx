import { connect } from "react-redux";
import { editDirectorAction } from "../actions/DirectorActions";
import { Formik, Field, Form} from "formik";

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
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}>
        <Form>
            <label >Imię : </label>
            <Field name="firstName"></Field>

            <label >Nazwisko : </label>
            <Field name="lastName"></Field>

            <label >Wiek: </label>
            <Field name="age" type="number"></Field>
            
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