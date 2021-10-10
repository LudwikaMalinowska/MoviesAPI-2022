import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({id, title, price, category, image, description, deleteProduct}) => {
    return (
        <div className="product-details" id={id}>
            <p className="big">Produkt: {title}</p>
            {image ? <img src={image} alt="" /> : null}
            <p>{description}</p>
            <p>Id: {id}</p>
            <p>Cena: {price}</p>
            <p>Kategoria: {category}</p>
            {/* <button onClick={() => deleteProduct(id)}>Usuń</button> */}
        </div>
    )
}

export default ProductDetails;