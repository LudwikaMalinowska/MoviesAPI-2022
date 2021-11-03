import { connect } from "react-redux";
import { editActorAction } from "../actions/ActorActions";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    firstName: Yup.string().required("Imię jest wymagane"),
    lastName: Yup.string().required("Nazwisko jest wymagane"),
    age: Yup.number()
    .min(1)
    .max(99)
    .required("Wiek jest wymagany")
})

const EditActor = (props) => {

    const actor = props.actor; 

    const initialValues = {
        firstName: actor.firstName,
        lastName: actor.lastName,
        age: actor
    }
    const handleSubmit = (values) => {
        
        const editedActor = {
            ...actor,
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age
        }
        
        props.editActorAction(editedActor);
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
    const actor = state.actors.find(actor => actor.id === id)

    return {
        actors: state.actors,
        movies: state.movies,
        actor
    }
}

const mapDispatchToProps = {
    editActorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditActor);