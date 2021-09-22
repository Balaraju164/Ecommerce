import React,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Button, Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

const RegisterScreen = ({location,history}) => {
    const [name,setname]=useState('')
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [confirmpassword,setconfirmpassword]=useState('')
   const [message,setmessage]=useState('')
   const dispatch=useDispatch()
   const userRegister = useSelector(state=>state.userRegister)
   const {loading,error,userInfo}=userRegister

   const redirect = location.search ? location.search.split('=')[1]:'/'

   useEffect(()=>{
       if(userInfo){history.push(redirect)}
   },[history,userInfo,redirect])
   
   const submitHandler=(e)=>{
        e.preventDefault()
        if(password!== confirmpassword)
        {
            setmessage("Passwords are not matching")
        }else{
            dispatch(register(name,email,password))
        }
   }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
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
                   Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>Already have account? {' '} <Link to={redirect ?  `/login/redirect=${redirect}`:'/register'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
