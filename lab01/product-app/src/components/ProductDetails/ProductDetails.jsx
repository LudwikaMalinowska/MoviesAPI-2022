import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({id, title, price, category}) => {
    return (
        <div className="product" id={id}>
            <p className="big">Produkt: {title}</p>
            <p>Id: {id}</p>
            <p>Cena: {price}</p>
            <p>Kategoria: {category}</p>
        </div>
    )
}

export default ProductDetails;