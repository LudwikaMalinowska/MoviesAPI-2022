import { connect } from "react-redux";
import {addProductAction} from "../../ducks/actions/ProductActions";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { getAllProducts } from "../../ducks/products/selectors";


const productSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    category: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required()
})

const AddProduct = (props) => {
    const initialValues = {
        id: uuidv4(),
        title: "",
        category: "",
        price: 0,
        description: "",
    }
    const handleSubmit = (values) => {
        props.addProductAction(values);
        // window.history.back();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form>
            <label >Nazwa produktu : </label>
            <Field name="title"></Field>
            <ErrorMessage name="title" component="div"/>

            <label >Kategoria: </label>
            <Field name="category" type="text"></Field>
            <ErrorMessage name="category" component="div"/>

            <label >Cena: </label>
            <Field name="price" type="number"></Field>
            <ErrorMessage name="price" component="div"/>

            <label >Opis: </label>
            <Field name="description" type="text"></Field>
            <ErrorMessage name="description" component="div"/>
            
            <button type="submit">Dodaj</button>
        </Form>
        </Formik>
    )
}

const mapStateToProps = (state) => {
    return {
        products: getAllProducts(state),
    }
}

const mapDispatchToProps = {
    addProductAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);