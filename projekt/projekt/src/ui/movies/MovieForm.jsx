import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { getAllMovies} from "../../ducks/movies/selectors";
import { createMovie, editMovie} from "../../ducks/movies/operations";


const movieSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa filmu jest wymagana'),
    genre: Yup.string().required(),
    description: Yup.string().required(),
    release_date: Yup.date().required(),
    image_url: Yup.string()
})

const MovieForm = (props) => {
    const movie = props.movie;
    const initialValues = movie ? ({
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        release_date: movie.release_date.substring(0, 10),
        description: movie.description,
        image_url: movie.image_url,
        director: movie.director,
    }) :
    ({
        id: uuidv4(),
        title: "",
        genre: "",
        release_date: "2021-01-01",
        description: "",
        image_url: "",
        director: null,
    })
    const handleSubmit = (values) => {
        console.log(values);
        console.log("movie:", movie);
        if (movie) {
            props.editMovie(values);
            alert("Edytowano")
        }
        else {
            props.createMovie(values);
            alert("dodano")
        }
            
        // window.history.back();
    }

    return ( 
        <Formik
            initialValues={initialValues}
            validationSchema={movieSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
        <div>
        <label >Nazwa filmu : </label>
            <Field name="title"></Field>
            <ErrorMessage name="title" component="div"/>

            <label >Genre: </label>
            <Field name="genre" type="text"></Field>
            <ErrorMessage name="genre" component="div"/>

            <label >Opis: </label>
            <Field name="description" type="text"></Field>
            <ErrorMessage name="description" component="div"/>

            <label >Release date: </label>
            <Field name="release_date" type="date"></Field>
            <ErrorMessage name="release_date" component="div"/>

            <label >Image url: </label>
            <Field name="image_url" type="text"></Field>
            <ErrorMessage name="image_url" component="div"/>
            
            <button type="submit">Dodaj</button>
        </div>
            
            <Link to="/movies"><button>Powrót do listy filmów</button></Link>
        </Form>

        
        </Formik>
     );
}
 
const mapStateToProps = (state, props) => {
    const id = props.match.params.idMovie;
    const movie = id ? (state.entities.movies.byId[id]) : null;
    return {
        movies: getAllMovies(state),
        movie: movie
    }
}

const mapDispatchToProps = {
    createMovie,
    editMovie
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);