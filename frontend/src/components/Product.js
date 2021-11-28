import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded' style={{height:'25rem'}}>
            <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' style={{width:'17rem',height:'13rem'}} />
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h3'><i className="fas fa-rupee-sign"></i>{product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
