import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR,
    PRODUCT_DETAIL_ERROR, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST
} from '../constants/productConstants'

const initialstate = {
    products: []
}

export const productListReducers = (state = initialstate, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducers = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}