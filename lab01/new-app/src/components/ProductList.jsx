import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails/ProductDetails';


const ProductList = () => {
    const [productList, setProductList] = useState(null);

    useEffect( async () => {
        const products = await axios.get('https://fakestoreapi.com/products')
        //.then(res => res.data)
        .catch(err => console.log(err) )

        console.log(products.data)

        setProductList(products.data)
    }, [])

    const content = (productList ? productList.map(product => <ProductDetails {...product}/>)
    : null)

    return (
        <div>
            {productList ? content : null}
        </div>
    )
}

export default ProductList;



