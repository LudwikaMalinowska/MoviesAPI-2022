import React, {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import CreateProduct from './CreateProduct/CreateProduct';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails/ProductDetails';
import ProductList from './ProductList';
import ProductPage from './ProductPage';

const Page = () => {
    // const [productList, setProductList] = useState(null);
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Redirect to="/products"/>
            </Route>
            <Route exact path="/products" component={ProductList}/>
            <Route exact path="products/:productId">
                <Redirect to="/products/:productId/details"/>
            </Route>
            <Route path="/products/:productId/details" component={ProductPage}/>
            <Route path="/products/new" component={CreateProduct}/>
            <Route path="/products/:productId/edit" 
                component={EditProduct}
            />
        </Switch>
        </>
    )
}

export default Page;