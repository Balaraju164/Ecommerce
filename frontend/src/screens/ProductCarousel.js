import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Carousel,Image} from 'react-bootstrap'
import {listTopProducts} from '../actions/productActions'
import {useDispatch,useSelector} from 'react-redux'

const ProductCarousel = () => {
    const dispatch=useDispatch()

    const productTopRated=useSelector(state=>state.productTopRated)
    const {loading,error,products}=productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
        <>
        <h2>Top rated products</h2>
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product)=>(
                <Carousel.Item key={product._id} className="carousel-item">
                    <Link to={`product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption d-none d-md-block'>
                            <h2>{product.name}</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
        </>
    )
}

export default ProductCarousel
