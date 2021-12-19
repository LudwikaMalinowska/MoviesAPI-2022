import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct} from "../../ducks/products/operations"; 
import {getProductList} from "../../ducks/products/operations";
import { getAllProducts } from "../../ducks/products/selectors";

import AddProduct from "./AddProduct";
import ProductDetails from "./ProductDetails";

const ProductList = ({ products, getProductList, deleteProduct, loading }, props) => {
// const UserList = (props) => {
    useEffect(() => {
        // console.log(products);
        if (products.length === 0)
            getProductList();
    }, []);

    

    
    const productList = products ? (
        products.map(product => {
            // console.log(product);
            const productLink = `/products/${product.id}`
            return (
                <li key={product.id}>
                    <p>{product.title}</p>
                    <Link to={productLink}><button>Szczegóły</button></Link>
                    <button onClick={() => deleteProduct(product)}>X</button>
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
    // console.log(state);
    return {
        // state
        products: getAllProducts(state),
        // loading: state.products.loading
    };
    
}

const mapDispatchToProps = {
    getProductList,
    deleteProduct,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);