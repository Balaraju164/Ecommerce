import React,{useEffect}from 'react'
import {Button, Col, Row,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import { Link } from 'react-router-dom'
import {createOrder} from '../actions/orderAction'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart=useSelector(state=>state.cart)

    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }

    cart.itemsPrice=addDecimals(cart.cartItems.reduce((acc,item)=>acc+item.qty*item.price,0))

    cart.shippingPrice= addDecimals(cart.itemsPrice > 100 ? 0 :100)

    cart.taxPrice= addDecimals(Number((0.15*cart.itemsPrice).toFixed(2)))

    cart.totalPrice= (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order,success,error} =orderCreate

    useEffect(()=>{
        if(success)
        {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line 
    },[history,success])

    const placeOrderHandler=(e)=>{
        e.preventDefault()
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <span>
                                <strong>Address:</strong>{' '}
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalcode},{' '}
                                {cart.shippingAddress.country}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <span>
                                <strong>Method:</strong>{' '}
                                {cart.paymentMethod}
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Your Orders</h3>
                            {cart.cartItems.length===0 ? <Message>Your cart is empty</Message> :
                            (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item,index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/profile/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = {item.qty*item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
              <Col md={4}>
                  <Card>
                      <ListGroup variant='flush'>
                          <ListGroup.Item>
                              <h3>Order Summary</h3>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Items</Col>
                                  <Col><i className="fas fa-rupee-sign"></i> {cart.itemsPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Shipping</Col>
                                  <Col><i className="fas fa-rupee-sign"></i> {cart.shippingPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Tax</Col>
                                  <Col><i className="fas fa-rupee-sign"></i> {cart.taxPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Total</Col>
                                  <Col><i className="fas fa-rupee-sign"></i>{cart.totalPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              {error&&<Message variant='danger'>{error}</Message>}
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Button type='button' className='col-12' disabled={cart.cartItems===0} onClick={placeOrderHandler}>Place Order</Button>
                          </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
