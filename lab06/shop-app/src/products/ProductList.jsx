import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductList, deleteProductAction } from "../actions/ProductActions";
import AddProduct from "./AddProduct";
import ProductDetails from "./ProductDetails";

const ProductList = ({ products, getProductList, deleteProductAction, loading }, props) => {
// const UserList = (props) => {
    useEffect(() => {
        getProductList();
    }, []);

    
    const productList = products ? (
        products.map(product => {
            const productLink = `/products/${product.id}`
            return (
                <li key={product.id}>
                    <p>{product.title}</p>
                    <Link to={productLink}><button>Szczegóły</button></Link>
                    <button onClick={() => deleteProductAction(product)}>X</button>
                </li>
            )
        })
    ) : null;

    return (
    <div>
    <AddProduct/>
    <ul>
        {productList}
    </ul>
    </div>
    
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        // state
        products: state.products.products,
        loading: state.products.loading
    };
    
}

const mapDispatchToProps = {
    getProductList,
    deleteProductAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);