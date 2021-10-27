import React from 'react'
import {withRouter} from 'react-router-dom'
import {Navbar,Nav,Container,Row,Col, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../actions/userActions'

const Header = ({history}) => {
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const admin='Admin'
    const dispatch=useDispatch()
    const logoutHandler=(e)=>{
        e.preventDefault()
        dispatch(logout())
        history.push('/')
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Row>
                        <Col>
                        <LinkContainer to='/'><Navbar.Brand>Pbrs_Ecommerce</Navbar.Brand></LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link></LinkContainer>
                        {userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                       </NavDropdown>):
                        <LinkContainer to='/login'><Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link></LinkContainer>}
                         {userInfo && userInfo.admin && (<NavDropdown title={admin} id='adminuser'>
                            <LinkContainer to='/admin/userlist'><NavDropdown.Item>Users</NavDropdown.Item></LinkContainer>
                            <LinkContainer to='/admin/productlist'><NavDropdown.Item>Products</NavDropdown.Item></LinkContainer>
                            <LinkContainer to='/admin/orderlist'><NavDropdown.Item>Orders</NavDropdown.Item></LinkContainer>
                        </NavDropdown>)}
                        </Nav>
                        </Navbar.Collapse>
                        </Col>
                    </Row>
              </Container>
            </Navbar>
        </header>
    )
}

export default withRouter(Header);