import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({id, title, price, category, deleteProduct}) => {
    return (
        <div className="product" id={id}>
            <p className="big">Produkt: {title}</p>
            <p>Id: {id}</p>
            <p>Cena: {price}</p>
            <p>Kategoria: {category}</p>
            <button onClick={() => deleteProduct(id)}>Usuń</button>
        </div>
    )
}

export default ProductDetails;