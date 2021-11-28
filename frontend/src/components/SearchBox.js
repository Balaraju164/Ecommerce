import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

const SearchBox = ({history}) => {

    const [keyword,setKeyword]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
           <Form.Control type='text' name='q' onChange={e=>setKeyword(e.target.value)} placeholder="search product..."
           className='mr-sm-2 ml-sm-2'></Form.Control>
           <Button type='submit' variant='outline-success' className='p-20' style={{marginLeft:"10px"}}>Search</Button> 
        </Form>
    )
}

export default withRouter(SearchBox)
