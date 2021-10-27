import React,{useState,useEffect, useRef}from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Button, Form, Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails,updateUserDetails} from '../actions/userActions'
import {getMyOrders} from '../actions/orderAction'

const ProfileScreen = ({history}) => {
    const [name,setname]=useState('')
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [confirmpassword,setconfirmpassword]=useState('')
   const [message,setmessage]=useState(null)

   const dispatch=useDispatch()

   const userDetails = useSelector(state=>state.userDetails)
   const {loading,error,user}=userDetails

   const userLogin = useSelector(state=>state.userLogin)
   const {userInfo}=userLogin

   const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
   const {success}=userUpdateProfile

   const myOrders = useSelector(state=>state.myOrders)
   const {loading:loadingOrders,error:errorOrders,orders}=myOrders

   let x=useRef(true)
   useEffect(()=>{
       if(!userInfo)
       {
           history.push('/login')
       }else {if(x.current){
           dispatch(getUserDetails('profile'))
           x.current=false
       }else{
           dispatch(getMyOrders())
           setname(user.name)
           setemail(user.email)
       }}
   },[user,dispatch,userInfo,history,success])
   
   const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmpassword)
        {
            setmessage("Passwords are not same")
        }else{
            dispatch(updateUserDetails({id: user._id,name,mail:email,password}))
        }

   }
    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {success && <Message variant='success'>Profile updated. Please reload the page</Message>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label style={{color:'black'}}>Name:</Form.Label>
                    <Form.Control type='name' placeholder='Enter your name' value={name} 
                    onChange={(e)=>setname(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label style={{color:'black'}}>Email address:</Form.Label>
                    <Form.Control type='email' placeholder='Enter your Email' value={email} 
                    onChange={(e)=>setemail(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label style={{color:'black'}}>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter your Password' value={password} 
                    onChange={(e)=>setpassword(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmpassword'>
                    <Form.Label style={{color:'black'}}>confirm password:</Form.Label>
                    <Form.Control type='password' placeholder='confirm password' value={confirmpassword} 
                    onChange={(e)=>setconfirmpassword(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' style={{marginTop:'1rem'}}>
                   Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders? <Loader/>: error? <Message variant='danger'>{errorOrders}</Message>:
                 (<Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ORDER_ID</th>
                         <th>DATE</th>
                         <th>TOTAL</th>
                         <th>PAID</th>
                         <th>DELIVERED</th>
                         <th>MORE_INFO</th>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order=>(
                         <tr key={order._id}>
                             <td>{order._id}</td>
                             <td>{order.createdAt.substring(0,10)}</td>
                             <td>{order.totalPrice}</td>
                             <td>{order.idPaid? 'Yes':<i className='fas fa-times' style={{color:'red'}}/>}</td>
                             <td>{order.isDelivered? 'Yes':<i className='fas fa-times' style={{color:'red'}}/>}</td>
                             <td>
                             <LinkContainer to={`order/${order._id}`}>
                                 <Button variant='light'>More Info</Button>
                             </LinkContainer>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>)
                }
            </Col>
        </Row>
    )
}

export default ProfileScreen
