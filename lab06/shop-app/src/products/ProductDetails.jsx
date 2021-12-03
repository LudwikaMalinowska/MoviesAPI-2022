import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductList } from "../actions/ProductActions";



const ProductDetails = ({product}, props) => {
    console.log("product: ", product);
    const content = product ? (
        <div>
            <p>nazwa: {product.title}</p>
            <p>cena: {product.price}</p>
            <p>kategoria: {product.category}</p>
            <img src={product.image} alt={product.name}
            style={{width: "100px"}}
            />
            <p>ocena: {product.rating.rate} ({product.rating.count} ocen)</p>
            <p>opis: {product.description}</p>
        </div>
    ) : null;
    
    // const content = null;
    return (
        <>
            {content}
        </>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    // const {id} = useParams();
    console.log(props);
    console.log(state);
    return {
        product: state.products.products.find(product => product.id === Number(id)),
        state
    };
}




export default connect(mapStateToProps, null)(ProductDetails);