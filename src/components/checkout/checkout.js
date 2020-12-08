import React, {Component} from 'react'
import { connect } from 'react-redux'
import WithClothService from '../hoc'
import {clearCart} from "../../actions"
import { Button } from 'reactstrap'

class Checkout extends Component {

    state = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        phoneNumber: "",
        email: "",
        isCheckoutSuccess: false
    }

    componentWillUnmount() {
        const {isCheckoutSuccess} = this.state

        const {userService} = this.props

        if (!isCheckoutSuccess) {
            userService.getConfigurableResource(
                "/cart/unreserve",
                "POST",
                {"Content-Type":"application/json"},
                null
            )
        }
    }

    checkoutSubmit = (event) => {
        event.preventDefault()

        const {userService, clearCart} = this.props

        const stateID = localStorage.getItem("STATE_ID")

        const {firstName, lastName, city, address, phoneNumber, email} = this.state

        const arr = [firstName, lastName, city, address, phoneNumber, email]

        const arrAfterFiltering = arr.filter(item => item != null && item.length > 3)

        if (arr.length !== arrAfterFiltering.length) {
            return
        }

        userService.getConfigurableResource(
            "/cart/process",
            "POST",
            {"Content-Type":"application/json", "STATE_ID":stateID},
            {
                firstName: firstName,
                lastName: lastName,
                city: city,
                address: address,
                phoneNumber: phoneNumber,
                email: email
            }
        ).then(res => {
            this.setState({
                isCheckoutSuccess: true
            })
            localStorage.removeItem("STATE_ID")
            clearCart()
        })
    }

    cancelCheckout = (event) => {
        event.preventDefault()
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    render() {
        const {token, roles, userService} = this.props

        if ((token && token.length > 0) && (roles && roles.length > 0)) {
            userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
                .then(res => this.setState({
                    firstName: res.firstName,
                    lastName: res.surname,
                    city: res.city,
                    address: res.address,
                    phoneNumber: res.phoneNumber,
                    email: res.username
                }))
        }

        return (
            <div>
                <form onSubmit={this.checkoutSubmit}>
                    <input type="text"
                        name="firstName"
                        value={this.state.firstName}
                        placeholder="First Name"
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="lastName"
                        value={this.state.lastName}
                        placeholder="Last Name"
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="city"
                        value={this.state.city}
                        placeholder="City"
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="address"
                        value={this.state.address}
                        placeholder="Address"
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        placeholder="Phone Number"
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.handleInputChanges}/>
                    <button type="submit">Checkout</button>
                </form>
                <Button onClick={this.cancelCheckout}>Cancel checkout</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        roles: state.roles
    }
}

const mapDispatchToProps = {
    clearCart
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(Checkout))