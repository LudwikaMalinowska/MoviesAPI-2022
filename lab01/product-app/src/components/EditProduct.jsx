import ProductForm from "./ProductForm";


const EditProduct = ({onSubmit, selectedProduct}) => {

    const initialValues = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        category: selectedProduct.category,
        image: selectedProduct.image, 
        description: selectedProduct.description,
    }

    return (
        <ProductForm
            onSubmit={onSubmit}
            initialValues={initialValues}
        />
    )
}

export default EditProduct;