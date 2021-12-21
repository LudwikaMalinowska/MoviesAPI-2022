import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';

import { getAllProducts } from "../../ducks/products/selectors";
import { updateProduct } from "../../ducks/products/operations";


const productSchema = Yup.object().shape({
    title: Yup.string().required('Nazwa produktu jest wymagana'),
    category: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required()
})

const EditProduct = (props) => {
    // console.log(props)
    const product = props.product;
    const initialValues = {
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image || '',
        rating: product.rating || {rate: 0, count: 0} 
    }
    const handleSubmit = (values) => {
        // props.createProduct(values);
        props.updateProduct(values);
        window.history.back();
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

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    
    return {
        product: state.entities.products.byId[id],
        state
    };
}

const mapDispatchToProps = {
    updateProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);