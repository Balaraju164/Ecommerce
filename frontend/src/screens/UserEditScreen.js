import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    console.log(loadingUpdate, successUpdate)

    const dispatch = useDispatch()

    useEffect(() => {
        if (successUpdate) {
            if (user._id === userId) {
                dispatch(getUserDetails(userId))
            }
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        }
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setname(user.name)
            setemail(user.mail)
            setIsAdmin(user.isAdmin)
        }

    }, [dispatch, userId, user, successUpdate, history])

    //console.log(name,email,isAdmin)

    const submitHandler = (e) => {
        e.preventDefault()
        if (!successUpdate) {
            dispatch(updateUser({ _id: userId, name, email, isAdmin }))
        }
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-dark my-3'>GoBack</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <FormContainer>
                    <h1>Edit User</h1>
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label style={{ color: 'black' }}>Name:</Form.Label>
                            <Form.Control type='name' placeholder='Enter your name' value={name}
                                onChange={(e) => setname(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label style={{ color: 'black' }}>Email address:</Form.Label>
                            <Form.Control type='email' placeholder='Enter your Email' value={email}
                                onChange={(e) => setemail(e.target.value)} style={{ border: '1px solid black', marginBottom: '1rem' }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            <Form.Check type='checkbox' checked={isAdmin} label='Is Admin'
                                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
