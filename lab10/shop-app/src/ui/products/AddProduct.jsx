import { connect } from "react-redux";

import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { initReactI18next, useTranslation } from 'react-i18next';

import { getAllProducts } from "../../ducks/products/selectors";
import { createProduct } from "../../ducks/products/operations";


const productSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    category: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required()
})

const AddProduct = (props) => {
    const { t } = useTranslation();

    const initialValues = {
        id: uuidv4(),
        title: "",
        category: "",
        price: 0,
        description: "",
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
            <label >{t('product_name')}: </label>
            <Field name="title"></Field>
            <ErrorMessage name="title" component="div"/>

            <label >{t('category')}: </label>
            <Field name="category" type="text"></Field>
            <ErrorMessage name="category" component="div"/>

            <label >{t('price')}: </label>
            <Field name="price" type="number"></Field>
            <ErrorMessage name="price" component="div"/>

            <label >{t('description')}: </label>
            <Field name="description" type="text"></Field>
            <ErrorMessage name="description" component="div"/>
            
            <button type="submit">{t('submit')}</button>
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
    createProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);