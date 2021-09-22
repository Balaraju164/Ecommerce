import {PRODUCT_LIST_ERROR,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST,
        PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_ERROR} from '../constants/productConstants'
import axios from 'axios'

export const listProducts =()=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductsDetails =(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}