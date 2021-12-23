import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { getAllMovies } from "../../ducks/movies/selectors";

const productSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa filmu jest wymagana'),
    genre: Yup.string().required(),
    description: Yup.string().required(),
    release_date: Yup.date().required(),
    image_url: Yup.string()
})

const MovieForm = (props) => {
    const initialValues = {
        id: uuidv4(),
        title: "",
        genre: "",
        release_date: "2021-01-01",
        description: "",
        image_url: "",
        director: null,
    }
    const handleSubmit = (values) => {
        props.createProduct(values);
        // window.history.back();
    }

    return ( 
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
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
        </Form>
        </Formik>
     );
}
 
const mapStateToProps = (state) => {
    return {
        products: getAllMovies(state),
    }
}

// const mapDispatchToProps = {
//     createMovie,
//     editMovie
// };

export default connect(mapStateToProps, null)(MovieForm);