import { connect } from "react-redux";
import {Link} from "react-router-dom";


const ProductDetails = ({product}, props) => {
    // console.log("product: ", product);
    const toEditLink = `/products/${product.id}/edit`
    const content = product ? (
        <div>
            <p>nazwa: {product.title}</p>
            <p>cena: {product.price}</p>
            <p>kategoria: {product.category}</p>
            <img src={product.image} alt={product.name}
            style={{width: "100px"}}
            />
            {product.rating && (<p>ocena: {product.rating.rate} ({product.rating.count} ocen)</p>) }
            <p>opis: {product.description}</p>
            <br/>
            <Link to={toEditLink}><button>Edytuj</button></Link>
            <Link to="/products"><button>Powrót do listy produktów</button></Link>
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
    // console.log(props);
    // console.log(state);
    return {
        product: state.entities.products.byId[id],
        state
    };
}




export default connect(mapStateToProps, null)(ProductDetails);