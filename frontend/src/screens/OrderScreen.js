import React,{useEffect}from 'react'
import {Col, Row,ListGroup,Image,Card, Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {deliverOrder, getOrderDetails, paidOrder} from '../actions/orderAction'
import {ORDER_DELIVER_RESET, ORDER_PAID_RESET} from '../constants/orderConstants'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({match}) => {
    const orderId=match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order,loading,error} =orderDetails

    const orderDeliver = useSelector(state=>state.orderDeliver)
    const {success:successDeliver} =orderDeliver

    const orderPaid = useSelector(state=>state.orderPaid)
    const {success:successPaid} =orderPaid

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    
    if(!loading)
    {
        const addDecimals=(num)=>{
            return (Math.round(num*100)/100).toFixed(2)
        }
    
        order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0))
    }


    useEffect(()=>{
        if(!order || successDeliver||successPaid || orderId!==order._id){
            dispatch({type:ORDER_PAID_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }

    },[orderId,dispatch,successDeliver,order,successPaid])

    const deliverHandler=()=>{
        dispatch(deliverOrder(order))
    }

    const paidHandler=()=>{
        dispatch(paidOrder(order))
    }

    return (
    <>
    <Meta title='Order Details'/>
    {loading? <Loader /> :error? <Message variant='danger'>{error}</Message>:
    <>
    <h1>Order: {order._id}</h1>
    <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.mail}`}>{order.user.mail}</a></p>
                            <p>
                                <strong>Address:</strong>{' '}
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalcode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered? <Message variant='success'>Delivered At: {order.deliveredAt}</Message>:<Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method:</strong>{' '}
                                {order.paymentMethod}
                            </p>
                            {order.isPaid? <Message variant='success'>Paid At :{order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Your Orders</h3>
                            {order.orderItems.length===0 ? <Message>Your cart is empty</Message> :
                            (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
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
                                  <Col><i className="fas fa-rupee-sign"></i> {order.itemsPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Shipping</Col>
                                  <Col><i className="fas fa-rupee-sign"></i> {order.shippingPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Tax</Col>
                                  <Col><i className="fas fa-rupee-sign"></i> {order.taxPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Total</Col>
                                  <Col><i className="fas fa-rupee-sign"></i>{order.totalPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Message>{'Order has been placed successfully...'}</Message>
                          </ListGroup.Item>
                          {userInfo.admin && !order.isPaid && (
                              <ListGroup.Item>
                                  <Button type='button' className='col-12' onClick={paidHandler}>Mark As Paid</Button>
                              </ListGroup.Item>
                          )}
                          {userInfo.admin && !order.isDelivered && (
                              <ListGroup.Item>
                                  <Button type='button' className='col-12' onClick={deliverHandler}>Mark As Delivered</Button>
                              </ListGroup.Item>
                          )}
                      </ListGroup>
                  </Card>
              </Col>
            </Row>
    </>
}
    </>
    )
}

export default PlaceOrderScreen
