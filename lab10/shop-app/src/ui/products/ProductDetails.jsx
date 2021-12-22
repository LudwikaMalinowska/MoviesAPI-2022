import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { initReactI18next, useTranslation } from 'react-i18next';


const ProductDetails = ({product}, props) => {
    const { t } = useTranslation();
    // console.log("product: ", product);
    const toEditLink = `/products/${product.id}/edit`
    const content = product ? (
        <div>
            <p>{t('product_name')}: {product.title}</p>
            <p>{t('price')}: {product.price}</p>
            <p>{t('category')}: {product.category}</p>
            <img src={product.image} alt={product.name}
            style={{width: "100px"}}
            />
            {product.rating && (<p>{t('rate')}: {product.rating.rate} ({product.rating.count} {t('rates')})</p>) }
            <p>{t('description')}: {product.description}</p>
            <br/>
            <Link to={toEditLink}><button>{t('edit')}</button></Link>
            <Link to="/products"><button>{t('back_to_products')}</button></Link>
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