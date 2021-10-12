import axios from 'axios';
import React, {useEffect, useState} from 'react'
import ProductDetails from './ProductDetails/ProductDetails'


const ProductPage = ({match, product, deleteProduct, setSelectedProduct}) => {
// const ProductPage = (props) => {


    const [thisproduct, setthisproduct] = useState(null);
    useEffect(async () => {
        if (product === undefined) {
            const productId = match.params.productId;
            const p = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            .catch(err => console.log(err) );
            setthisproduct(p.data);
        } 
    }, [])

    const productToShow = product ? product : thisproduct;
    // console.log(match.params.productId);
    return (
        <div className="product" 
        // key={product.id}
        >
            <ProductDetails  {...productToShow}/>
            <button onClick={() => deleteProduct(productToShow.id)}>Usuń</button>
            <button onClick={() => {setSelectedProduct(productToShow)}}>Edytuj</button>
        </div>
    )
}

export default ProductPage;