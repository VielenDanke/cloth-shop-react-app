import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout, categoryLoaded} from "../../actions"
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, UncontrolledDropdown,
    DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

class ClothHeader extends Component {

    componentDidMount() {
        const {categoryLoaded, categoryService} = this.props

        categoryService.getAllCategories()
            .then(res => categoryLoaded(res))
    }

    render() {
        const {token, roles, categories, logout} = this.props

        const loginLogoutCabinetComponent = token && roles ? 
            <div>
                <Link to="/cabinet/">Cabinet</Link>
                <Link to="/logout/" onClick={logout}>Logout</Link>
            </div> : 
            <Link to="/login/">Login</Link>

        return (
            <Navbar color="light" light expand="lg">
                <NavbarBrand href="/">Minimo Shop</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Men's clothes
                            </DropdownToggle>
                            <DropdownMenu right>
                                {
                                    categories.map(item => {
                                        return (
                                            <DropdownItem key={item.id}>
                                                <NavLink href={`/clothes/man/${item.category}/`}>{item.category}</NavLink>
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavItem>
                    <NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Woman's clothes
                            </DropdownToggle>
                            <DropdownMenu right>
                                {
                                    categories.map(item => {
                                        return (
                                            <DropdownItem key={item.id}>
                                                <NavLink href={`/clothes/woman/${item.category}/`}>{item.category}</NavLink>
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavItem>
                </Nav>
                {loginLogoutCabinetComponent}
            </Navbar>
        )
   }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        roles: state.roles,
        categories: state.categories
    }
}

const mapDispatchToProps ={
    logout, categoryLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothHeader)
