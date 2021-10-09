//import React from 'react';

// import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Formik, Field, Form, ErrorMessage} from "formik";


const userSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    price: Yup.number().positive().required(),
    category: Yup.string().required("Kategoria jest wymagana"),
    image: Yup.string().url(),
})



const ProductForm = ({onSubmit, initialValues}) => {

  return (

    <Formik 
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      <Form>
      <label >Nazwa produktu: </label>
        <Field name="title"></Field>
        <ErrorMessage name="title" component="div"/>
        <label >Cena: </label>
        <Field name="price"/>
        <ErrorMessage name="price" component="div"/>
        <label >Kategoria: </label>
        <Field name="category"/>
        <ErrorMessage name="category" component="div"/>
        <label>Zdjęcie (opcjonalne): </label>
        <Field name="image"/>
        <ErrorMessage name="image" component="div"/>
        <button type="submit">Dodaj</button>
      </Form>
    </Formik>
  )

};

export default ProductForm;