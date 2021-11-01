import { connect } from "react-redux";
import {addMovieAction} from "../actions/MovieActions";
import { Formik, Field, Form} from "formik";
import {v4 as uuidv4 } from 'uuid';

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
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
            <label >Tytuł filmu : </label>
            <Field name="title"></Field>

            <label >Rok produkcji: </label>
            <Field name="productionYear" type="number"></Field>
            
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