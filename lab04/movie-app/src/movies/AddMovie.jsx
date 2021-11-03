import { connect } from "react-redux";
import {addMovieAction} from "../actions/MovieActions";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';


const userSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    productionYear: Yup.number()
    .min(1800)
    .max(2022)
    .required('Rok produkcji jest wymagany')
})


const AddMovie = (props) => {
    const initialValues = {
        id: uuidv4(),
        title: "",
        productionYear: "",
        directorId: "-1"
    }
    const handleSubmit = (values) => {
        props.addMovieAction(values);
        window.history.back();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
            <label >Tytuł filmu : </label>
            <Field name="title"></Field>
            <ErrorMessage name="title" component="div"/>

            <label >Rok produkcji: </label>
            <Field name="productionYear" type="number"></Field>
            <ErrorMessage name="productionYear" component="div"/>
            
            <button type="submit">Dodaj</button>
        </Form>
        </Formik>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = {
    addMovieAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);