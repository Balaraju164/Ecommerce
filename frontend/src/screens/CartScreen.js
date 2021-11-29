import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {addToCart,removeFromCart} from '../actions/cartActions'
import Message from '../components/Message'
import Meta from'../components/Meta'

const CartScreen = ({match,location,history}) => {
    const productID = match.params.id
    const qty = location.search? Number (location.search.split("=")[1]) : 1   //?qty=4 -- [qty,4]
    const dispatach=useDispatch()
    const cart = useSelector(state=>state.cart)
    const {cartItems} =  cart
    
    useEffect(()=>{
        if(productID)
        {
            dispatach(addToCart(productID,qty))
        }
    },[dispatach,productID,qty,match])

    const removeFromCartHandler=(id)=>{
        dispatach(removeFromCart(id))
        
    }
    const checkOutHandler =()=>
    {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
        <Meta title='Welcome to Pbrs | Cart'/>
        <Row>
            <Col md={8}>
                <h2>Shopping Cart</h2><Link className='btn btn-dark my-3' to={`/`}>Go Back</Link>
                {cartItems.length===0 ? <Message>Your cart is empty <Link to ='/'>Go back to fill the bag</Link></Message>:
                <ListGroup>
                    {cartItems.map(item=>(
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                <Link to ={`/product/${item.product}`} style={{textDecoration:'none'}}>{item.name}</Link>
                                </Col>
                                <Col md={2}><i className="fas fa-rupee-sign"></i> {item.price}</Col>
                                <Col md={2}>
                                <Form.Control as='select' value={item.qty} onChange={(e)=>dispatach(addToCart(item.product,Number(e.target.value)))}>
                             {
                                 [...Array(item.countInStock).keys()].map(x=>(
                                     <option key={x+1} value={x+1}>{x+1}</option>
                                 ))
                             }
                         </Form.Control>
                                </Col>
                                <Col md={2}><Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                    </Button></Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <i className="fas fa-rupee-sign"></i> {cartItems.reduce((acc, item)=>acc+item.qty * item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='col-12' onClick={checkOutHandler} disabled={cartItems.length===0}>Procced To Pay</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default CartScreen
