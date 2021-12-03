import axios from "axios";

export const PRODUCT_ADD = 'PRODUCT_ADD';
export const PRODUCT_DELETE = 'PRODUCT_DELETE';
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_REQUEST_START = 'PRODUCT_LIST_REQUEST_START';
export const PRODUCT_LIST_REQUEST_FAILED = 'PRODUCT_LIST_REQUEST_FAILED';

export const addProductAction = (newProduct) => ({
    type: PRODUCT_ADD,
    payload: newProduct
});

export const deleteProductAction = (product) => ({
    type: PRODUCT_DELETE,
    payload: product
});

export const productListRequestAction = (products) => ({
    type: PRODUCT_LIST_REQUEST,
    payload: products
})

export const productListRequestStartAction = ({
    type: PRODUCT_LIST_REQUEST_START
});

export const productListRequestFailAction = (error) => ({
    type: PRODUCT_LIST_REQUEST_FAILED,
    payload: error
})


// state => dispatch => action

export const getProductList = () => {
    return async dispatch => {
        dispatch(productListRequestStartAction);
        console.log('Create product action');
        setTimeout(async () => {
            try{
                const response = await axios.get('https://fakestoreapi.com/products');
                dispatch(productListRequestAction(response.data));        
            }catch(ex) {
                dispatch(productListRequestFailAction(ex));
            }
        }, 4000)
    }
}