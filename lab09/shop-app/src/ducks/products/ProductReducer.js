import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_REQUEST_FAILED, PRODUCT_LIST_REQUEST_START,
PRODUCT_ADD, 
PRODUCT_DELETE
} from "../actions/ProductActions";

const initState = {
    products: [],
    loading: false,
    error: ''
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case PRODUCT_ADD:
            return {...state, 
                products: [...state.products, action.payload]}
        case PRODUCT_DELETE:
            return {...state,
            products: state.products.filter(product => product.id !== action.payload.id)}
        case PRODUCT_LIST_REQUEST_START: 
            // return { ...state, loading: true }
            return [...state];
        case PRODUCT_LIST_REQUEST_FAILED:
            // return { ...state, loading: false, error: action.payload }
            return [...state, action.payload]
        case PRODUCT_LIST_REQUEST:
            // return {...state, products: [...action.payload], loading: false };
            return [...state];
        default:
            return state;
    }
}

export default productReducer;