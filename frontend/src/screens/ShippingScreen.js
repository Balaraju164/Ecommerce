import React,{useState}from 'react'
import {Button, Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveSippingAddress} from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
import Meta from '../components/Meta'

const ShippingScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address,setaddress]=useState(shippingAddress.address)
    const [city,setcity]=useState(shippingAddress.city)
    const [postalcode,setpostalcode]=useState(shippingAddress.postalcode)
    const [country,setcountry]=useState(shippingAddress.country)

    const dispatch=useDispatch()

    const submitHandler=(e)=>
    {
        e.preventDefault()
        dispatch(saveSippingAddress({address,city,postalcode,country}))
        history.push('/payment')
    }
    return (
        <>
        <Meta title='Shipping details'/>
        <FormContainer>
        <CheckOutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label style={{color:'black'}}>Address:</Form.Label>
                <Form.Control type='address' placeholder='Enter your address' value={address} required
                onChange={(e)=>setaddress(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
            </Form.Group>
        
            <Form.Group controlId='city'>
                <Form.Label style={{color:'black'}}>City:</Form.Label>
                <Form.Control type='city' placeholder='Enter your city' value={city} required
                onChange={(e)=>setcity(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label style={{color:'black'}}>PostalCode:</Form.Label> 
                <Form.Control type='postalcode' placeholder='Enter your postalcode' value={postalcode} required
                onChange={(e)=>setpostalcode(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label style={{color:'black'}}>Country:</Form.Label>
                <Form.Control type='country' placeholder='Enter your country' value={country} required
                onChange={(e)=>setcountry(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{marginTop:'1rem'}}>
               Continue
            </Button>
        </Form>
    </FormContainer></>
    )
}

export default ShippingScreen
