import React,{useEffect} from 'react'
//import Products from '../products'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from './ProductCarousel'
import Meta from '../components/Meta'
import {Link} from 'react-router-dom'

const Homescreen = ({match}) => {
    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber

    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {loading,error,products,pages,page}=productList

    //console.log(productList)

    useEffect(()=>{
        dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])

    return (
        <>
        <Meta/>
        {!keyword ? <ProductCarousel/> :<Link className='btn btn-dark my-3' to='/'>Go Back</Link>}
         <h1>Latest products</h1>
         {loading?<Loader/>: error ? <Message variant ='danger'>{error}</Message>: (
             <>
             <Row>
             {products.map((product)=>(
                 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                 <Product product={product} />
                 </Col>
             ))}
         </Row> 
         <Paginate pages={pages} page={page} keyword={keyword ? keyword:''}/> 
             </>
         )
          } 
        </>
    )
}

export default Homescreen


//script for fetch product without redux

/*const [products,setproducts]=useState([])
const fetchProducts = async ()=>{
            const {data} = await axios.get('/api/products')
            setproducts(data)
        }

    fetchProducts();*/

