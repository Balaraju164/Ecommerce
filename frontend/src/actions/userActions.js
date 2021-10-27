import axios from 'axios'
import {USER_LOGIN_FAIL,USER_LOGOUT,USER_LOGIN_SUCCESS,USER_LOGIN_REQUEST,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL} from '../constants/userConstants'

export const login=(mail,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        //const body= JSON.stringify({email,password})
        const {data} = await axios.post('/api/user/login',{mail,password},config)
        //console.log(data)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        //console.log(error)
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}

export const logout =()=>async(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
    })
}

export const register=(name,mail,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/user',{name,mail,password},config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}

export const getUserDetails=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
        //console.log(getState())
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/user/${id}`,config)
        //console.log(data)

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })      
        
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}

export const updateUserDetails=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
        //console.log(getState())
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/user/profile',user,config)

        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}

export const getAllUsers=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/user',config)

        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}

export const deleteUser=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })

        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/user/${id}`,config)
        
        dispatch({
            type:USER_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message
        })
    }
}