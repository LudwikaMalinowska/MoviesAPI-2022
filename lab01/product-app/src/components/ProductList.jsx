import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails/ProductDetails';
import CreateProduct from './CreateProduct/CreateProduct';


const ProductList = () => {
    const [productList, setProductList] = useState(null);
    const [newProductId, setNewProductId] = useState(0);

    useEffect( () => {
        async function fetchData() {
            const products = await axios.get('https://fakestoreapi.com/products')
            //.then(res => res.data)
            .catch(err => console.log(err) )

            console.log(products.data)

            setProductList(products.data)
            setNewProductId(products.data.length+1)
        }
        
        fetchData();
    }, [])

    const createProduct = async (newProduct, {resetForm}) => {
        const response = await axios.post('https://fakestoreapi.com/products', newProduct);
        console.log(response);
        if (response.status === 200) {
            const newProduct = response.data;
            newProduct.id = newProductId;
            setProductList([...productList, newProduct]);
            setNewProductId(prev => prev+1)
            resetForm();
            
            
        }
    }

    const content = (productList ? productList.map(product => <ProductDetails key={product.id} {...product}/>)
    : null)

    return (
        <div>
            <CreateProduct onSubmit={createProduct}/>
            {productList ? content : null}
        </div>
    )
}

export default ProductList;



