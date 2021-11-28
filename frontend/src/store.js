import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers,productDetailsReducers,productDeleteReducer, createProductReducer, updtaeProductReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducer'
import {orderCreateReducer,orderDetailsReducer,MyordersReducer, ordersListReducer, ordersDeliverReducer, ordersPaidReducer} from './reducers/orderReducer'

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')):{}

const reducer = combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    productDelete:productDeleteReducer,
    productCreate:createProductReducer,
    productUpdate:updtaeProductReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailReducer,
    userList:userListReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderList:ordersListReducer,
    orderDeliver:ordersDeliverReducer,
    orderPaid:ordersPaidReducer,
    myOrders:MyordersReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer
})

const initialstate ={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]

const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

//console.log(store)

export default store
