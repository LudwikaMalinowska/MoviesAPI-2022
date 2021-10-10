import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails/ProductDetails';
import CreateProduct from './CreateProduct/CreateProduct';
import EditProduct from './EditProduct';
import { useConfirm } from 'material-ui-confirm';


const ProductList = () => {
    const confirm = useConfirm();
    const [productList, setProductList] = useState(null);
    const [newProductId, setNewProductId] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect( () => {
        async function fetchData() {
            const products = await axios.get('https://fakestoreapi.com/products')
            //.then(res => res.data)
            .catch(err => console.log(err) )

            setProductList(products.data)
            setNewProductId(products.data.length+1)
        }
        
        fetchData();
    }, [])

    const createProduct = async (newProduct, {resetForm}) => {
        const response = await axios.post('https://fakestoreapi.com/products', newProduct);
        //console.log(response);
        if (response.status === 200) {
            const newProduct = response.data;
            newProduct.id = newProductId;
            // setProductList([...productList, newProduct]);
            setProductList([...productList, response.data]);
            setNewProductId(prev => prev+1)
            resetForm();
            
            
        }
    }

    const deleteProduct = async (id) => {
        confirm({description: "Czy jesteś pewien, że chcesz usunąć produkt?"})
        .then( async () => {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            if (response.status === 200) {
                const newProductList = productList.filter(product => product.id !== id)
                setProductList(newProductList);
            } 
        })
        .catch(() => {/* ... */});
    }

    const editProduct = async (editedProduct) => {
        const response = await axios.put(`https://fakestoreapi.com/products/${editedProduct.id}`, editedProduct);
        
        if (response.status === 200) {
            const productIndex = productList.findIndex(product => product.id === editedProduct.id);
            let newProductList = [...productList];
            // newProductList[productIndex] = editedProduct;
            newProductList[productIndex] = response.data;

            setProductList(newProductList);
            setSelectedProduct(null);
        }
    }


    const content = (productList ? productList.map(product =>
        <div className="product" key={product.id}>
            <ProductDetails  {...product}/>
            <button onClick={() => deleteProduct(product.id)}>Usuń</button>
            <button onClick={() => {setSelectedProduct(product)}}>Edytuj</button>
        </div>
        )
    : null)

    return (
        <div>
            <CreateProduct onSubmit={createProduct}/>
            {selectedProduct && (<div>
                    <p>Edycja</p>
                    <EditProduct
                        selectedProduct={selectedProduct}
                        onSubmit={editProduct}
                    />
            </div>

            )}
            {productList ? content : null}
        </div>
    )
}

export default ProductList;



