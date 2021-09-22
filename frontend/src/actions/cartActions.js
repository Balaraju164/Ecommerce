import axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SHIPPING_ADDRESS} from '../constants/cartConstants'

export const addToCart = (id,qty)=>async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveSippingAddress=(data)=>async(dispatch,getState)=>{
    dispatch({
        type:SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAdress',JSON.stringify(getState().cart.shippingAddress))
}

export const savePayment=(data)=>async(dispatch,getState)=>{
    dispatch({
        type:SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem('PaymentMethod',JSON.stringify(data))
}