import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listProductsDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate,success:successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if (!product.name || product._id !== productId) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setDescription(product.description)
            }
        }
        

    }, [dispatch,product,productId,history,successUpdate])

    const uploadFileHandler=async(e)=>{
        const file = e.target.files[0]
        const formdata= new FormData()
        formdata.append('image',file)
        console.log(file,formdata)
        setUploading(true)

        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data}= await axios.post('/api/upload',formdata,config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,name,price,image,brand,category,description,countInStock
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>GoBack</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <FormContainer>
                    <h1>Edit Product</h1>
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label style={{ color: 'black' }}>Name:</Form.Label>
                            <Form.Control type='name' placeholder='Enter your name' value={name}
                                onChange={(e) => setName(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label style={{ color: 'black' }}>Price:</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price}
                                onChange={(e) => setPrice(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label style={{ color: 'black' }}>Image:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Image' value={image}
                                onChange={(e) => setImage(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                            <Form.File id='image-file' label='Choose file' custom onChange={uploadFileHandler} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label style={{ color: 'black' }}>Brand:</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand}
                                onChange={(e) => setBrand(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label style={{ color: 'black' }}>CountInStock:</Form.Label>
                            <Form.Control type='number' placeholder='Enter countInStock' value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label style={{ color: 'black' }}>Category:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category}
                                onChange={(e) => setCategory(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label style={{ color: 'black' }}>Description:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description}
                                onChange={(e) => setDescription(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                            Update
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    )
}

export default ProductEditScreen
