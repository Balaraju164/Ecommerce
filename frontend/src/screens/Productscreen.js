import React,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux'
import {listProductsDetails,createProductReview} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
//import axios from 'axios'

const Productscreen = ({match,history}) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

       //--- using product file in component ---//
   // const product = products.find(p=>p._id===match.params.id)
   //const [product,setproduct]=useState({})

   const dispatch=useDispatch()
   const productDetails=useSelector(state=>state.productDetails)
   const {loading,error,product} = productDetails

   const productReview=useSelector(state=>state.productReview)
   const {error:errorReview,success:successReview} = productReview

   const userLogin = useSelector(state=>state.userLogin)
   const {userInfo}=userLogin

   useEffect(()=>{
    if(successReview){
        alert('review submited')
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductsDetails(match.params.id))
},[dispatch,match,successReview])

    const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        console.log('hii')
        dispatch(createProductReview(match.params.id,{rating,comment}))
    }

    return (
        <>
        <Meta title={product.name}/>
        <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
        {loading?<Loader/>: error ? <Message variant='danger'>{error}</Message>:
        (
        <>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}> 
                <ListGroup variant='flush'>
                    <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroup.Item>
                    <ListGroup.Item>Price: <i className="fas fa-rupee-sign"></i> {product.price}</ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col><span><i className="fas fa-rupee-sign"></i>{product.price}</span></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status:
                            </Col>
                            <Col>{product.countInStock>0?'In stock':'Out of stock'}</Col>
                        </Row>
                    </ListGroup.Item>
                   {product.countInStock > 0 &&
                     <ListGroup.Item>
                     <Row>
                         <Col>Qty:</Col>
                         <Col>
                         <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                             {
                                 [...Array(product.countInStock).keys()].map(x=>(
                                     <option key={x+1} value={x+1}>{x+1}</option>
                                 ))
                             }
                         </Form.Control>
                         </Col>
                     </Row>
                 </ListGroup.Item>
                   }
                    <ListGroup.Item>
                        <Button className='col-12' type='button' disabled={product.countInStock===0} onClick={addToCartHandler}>Add To Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.review?.length===0 && <Message>{"No reviews for this product"}</Message> }
                <ListGroup variant='flush'>
                    {product.review && product.review.map(rev=>(
                        <ListGroup.Item key={rev._id}>
                            <strong>{rev.name}</strong>
                            <Rating value={rev.rating}/>
                            <p>{rev.createdAt.substring(0,10)}</p>
                            <p>{rev.comment}</p>
                        </ListGroup.Item>
                    ))}
                <ListGroup.Item>
                        <h2>Write your review</h2>
                        {errorReview && <Message variant='danger'>{errorReview}</Message>}
                        {userInfo?(
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}>
                                        <option value=''>Select..</option>
                                        <option value='1'>1-Poor</option>
                                        <option value='2'>2-Fair</option>
                                        <option value='3'>3-Good</option>
                                        <option value='4'>4-Very Good</option>
                                        <option value='5'>5-Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)} style={{border:'1px solid black',marginBottom:'1rem'}}></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                            </Form>
                        ):<Message>Please <Link to='/login'>Sign in</Link> to review</Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
        </>
    )
    
}

export default Productscreen
