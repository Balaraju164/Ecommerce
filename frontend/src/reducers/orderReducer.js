import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
         ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,
         ORDER_MY_REQUEST,ORDER_MY_FAIL,ORDER_MY_RESET,ORDER_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, ORDER_PAID_REQUEST, ORDER_PAID_SUCCESS, ORDER_PAID_FAIL, ORDER_PAID_RESET } from "../constants/orderConstants";


export const orderCreateReducer = (state={},action)=>{
    switch(action.type)
    {
        case ORDER_CREATE_REQUEST:
            return {loading:true}
        
        case ORDER_CREATE_SUCCESS:
            return {loading:false, success:true, order:action.payload}

        case ORDER_CREATE_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}

export const orderDetailsReducer = (state={loading:true,orderItems:[],shippingAddress:{}},action)=>{
    switch(action.type)
    {
        case ORDER_DETAILS_REQUEST:
            return {...state,loading:true}
        
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, order:action.payload}

        case ORDER_DETAILS_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}

export const MyordersReducer = (state={orders:[]},action)=>{
    switch(action.type)
    {
        case ORDER_MY_REQUEST:
            return {...state,loading:true}
        
        case ORDER_MY_SUCCESS:
            return {...state,loading:false, orders:action.payload}

        case ORDER_MY_FAIL:
            return {...state,loading:false, error:action.payload}

        case ORDER_MY_RESET:
            return {}
        
        default:
            return state
    }
}

export const ordersListReducer = (state={orders:[]},action)=>{
    switch(action.type)
    {
        case ORDER_LIST_REQUEST:
            return {loading:true}
        
        case ORDER_LIST_SUCCESS:
            return {loading:false, orders:action.payload}

        case ORDER_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const ordersDeliverReducer = (state={},action)=>{
    switch(action.type)
    {
        case ORDER_DELIVER_REQUEST:
            return {loading:true}
        
        case ORDER_DELIVER_SUCCESS:
            return {loading:false, success:true}

        case ORDER_DELIVER_FAIL:
            return {loading:false, error:action.payload}

        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const ordersPaidReducer = (state={},action)=>{
    switch(action.type)
    {
        case ORDER_PAID_REQUEST:
            return {loading:true}
        
        case ORDER_PAID_SUCCESS:
            return {loading:false, success:true}

        case ORDER_PAID_FAIL:
            return {loading:false, error:action.payload}

        case ORDER_PAID_RESET:
            return {}
        default:
            return state
    }
}