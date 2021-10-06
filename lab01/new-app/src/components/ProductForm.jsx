import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    title: Yup.string().required('Nzwa jest wymagane'),
    price: Yup.number(),
    category: Yup.string()
})


const SignupForm = () => {


  const formik = useFormik({

    initialValues: {

      title: '',
      price: 0,
      category: '',

    },

    onSubmit: values => {

      alert(JSON.stringify(values, null, 2));

    },

  });

  return (

    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="title">Nazwa produktu: </label>
      <input
        id="title"
        name="title"
        type="title"
        onChange={formik.handleChange}
        value={formik.values.title}

      />

<label htmlFor="price">Cena: </label>
      <input
        id="price"
        name="price"
        type="price"
        onChange={formik.handleChange}
        value={formik.values.price}

      />

<label htmlFor="category">Kategoria: </label>
      <input
        id="category"
        name="category"
        type="category"
        onChange={formik.handleChange}
        value={formik.values.category}

      />



      <button type="submit">Submit</button>

    </form>

  );

};