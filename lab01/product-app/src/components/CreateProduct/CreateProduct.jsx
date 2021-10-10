import ProductForm from "../ProductForm";
import "./CreateProduct.css";

const initialValues = {
    title: '',
    price: 0,
    category: '',
    image: '',
    description: '',
}

const CreateProduct = ({onSubmit}) => {
    return (
      <div className="add-product">
      <ProductForm onSubmit={onSubmit} initialValues={initialValues}/>
      </div>
    
    )
}

export default CreateProduct;