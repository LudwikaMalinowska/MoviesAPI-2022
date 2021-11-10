import { connect } from "react-redux";
import { editMovieAction } from "../actions/MovieActions";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    productionYear: Yup.number()
    .min(1800)
    .max(2022)
    .required('Rok produkcji jest wymagany')
})

const EditMovie = (props) => {
    // console.log(props);
    const movie = props.movie;
    const initialValues = {
        title: movie.title,
        productionYear: movie.productionYear
    }
    const handleSubmit = (values) => {
        
        console.log(values);
        const editedMovie = {
            ...movie,
            title: values.title, 
            productionYear: values.productionYear, 
            }
        console.log(editedMovie);
        props.editMovieAction(editedMovie);
        window.history.back()
    }
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}>
        <Form>
            <label >Tytuł filmu : </label>
            <Field name="title" ></Field>
            <ErrorMessage name="title" component="div"/>

            <label >Rok produkcji: </label>
            <Field name="productionYear" type="number" ></Field>
            <ErrorMessage name="productionYear" component="div"/>
            
            <button type="submit">Zatwierdź</button>
        </Form>
        </Formik>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const movie = state.movies.find(movie => movie.id === id)
    return {
        directors: state.directors,
        movies: state.movies,
        movie
    }
}

const mapDispatchToProps = {
    editMovieAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);