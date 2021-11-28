import React,{useEffect}from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Table,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts,deleteProduct,createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = ({history,match}) => {
    const pageNumber=match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList=useSelector(state=>state.productList)
  const {loading,error,products,pages,page}=productList

  const productDelete = useSelector(state=>state.productDelete)
  const {loading:LoadingDelete,success:sucessDelete,error:errorDelete}=productDelete

  const productCreate = useSelector(state=>state.productCreate)
  const {loading:LoadingCreate,success:sucessCreate,error:errorCreate,product:createdProduct}=productCreate

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  
  useEffect(()=>{
      dispatch({type:PRODUCT_CREATE_RESET})

      if(sucessCreate){
          history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('',pageNumber))
        }
  },[dispatch,userInfo,sucessDelete,createdProduct,history,sucessCreate,pageNumber])

  const deleteProductHandler=(id)=>{
        if(window.confirm('Are you sure want to delete'))
        {
            dispatch(deleteProduct(id))
        }
  }

  const createProductHandler=()=>{
      dispatch(createProduct())
  }

    return (
        <>
        <Row>
            <Col md={6}><h1>Products</h1></Col>
            <Col md={3}>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {LoadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {LoadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
         {loading? <Loader/> : error? <Message variant='danger'>{error}</Message>:(
             <>
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                    <tr>
                    <th>ID</th>
                     <th>NAME</th>
                     <th>PRICE</th>
                     <th>CATEGORY</th>
                     <th>BRAND</th>
                     <th>MORE_INFO</th>
                    </tr>
                 </thead>
                 <tbody>
                     {products.map(product=>(
                         <tr key={product._id}>
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>{product.price}</td>
                             <td>{product.category}</td>
                             <td>{product.brand}</td>
                             <td>
                                 <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                     <Button variant='light' className='btn-sm'>
                                         <i className='fas fa-edit'></i>
                                     </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={()=>deleteProductHandler(product._id)}>
                                     <i className='fas fa-trash'></i>
                                 </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
             <Paginate pages={pages} page={page} isAdmin={true}/>
             </>
         )}   
        </>
    )
}

export default ProductListScreen
