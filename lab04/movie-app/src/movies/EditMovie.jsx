import { connect } from "react-redux";
import { editMovieAction } from "../actions/MovieActions";
import { Formik, Field, Form} from "formik";

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
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}>
        <Form>
        <label >Tytuł filmu : </label>
            <Field name="title" ></Field>

            <label >Rok produkcji: </label>
            <Field name="productionYear" type="number" ></Field>
            
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