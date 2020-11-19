import React from 'react'
import {Link, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from "../../actions"
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, Button } from 'reactstrap';

const ClothHeader = ({token, roles, logout}) => {
    const loginCabinetComponent = token && roles ? <Link to="/cabinet/">Cabinet</Link> : <Link to="/login/">Login</Link>

    return (
        <Navbar color="light" light expand="lg">
            <NavbarBrand href="/">Minimo Shop</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href="/clothes/all/">Clothes</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/clothes/man/">Man's clothes</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/clothes/woman/">Woman's clothes</NavLink>
                </NavItem>
                
                <Route exact path="/logout">
                    <Redirect to="/"/>
                </Route>
            </Nav>
            {token && roles ? <Button outline color="primary"><Link to="/logout/" onClick={logout}>Logout</Link></Button> : null}
            <Button outline color="primary">{loginCabinetComponent}</Button>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        roles: state.roles
    }
}

const mapDispatchToProps ={
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothHeader)
