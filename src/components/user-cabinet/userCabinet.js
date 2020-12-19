import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {Spinner} from "reactstrap"
import {logout, updateUserWithToken} from "../../actions"
import {ACCESS_TOKEN} from "../../constants"

class UserCabinet extends Component {

    state = {
        user: undefined,
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        phoneNumber: ""
    }

    componentDidMount() {
        this.fetchCurrentUser()
    }

    fetchCurrentUser = () => {
        const {userService, token, logout} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
            .then(res => {
                this.setUserInState(res)
            }).catch(resError => {
                logout()
            })
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    updateUser = (event) => {
        event.preventDefault()

        const {userService, token, updateUserWithToken} = this.props

        const {id, username, firstName, lastName, phoneNumber, city, address} = this.state

        const isValidRequest = this.validateRequestBody(
            username, firstName, lastName, phoneNumber, city, address
        )
        if (!isValidRequest) {
            return
        }
        const requestObj = {
            username, firstName, lastName, phoneNumber, city, address, id
        }
        userService.getConfigurableResource(
            "/cabinet/update", "POST", {"accessToken":token, "Content-Type":"application/json"}, requestObj
        ).then(res => {
            const accessToken = res.headers.get(ACCESS_TOKEN)
            updateUserWithToken(accessToken)
            return res.json()
        })
        .then(res => {
            this.setUserInState(res)
        })
    }

    validateRequestBody = (...args) => {
        let isValidRequest = true;
        args.forEach(item => {
            if (item === "" || item.length <= 4) {
                isValidRequest = false
            }
        })
        return isValidRequest
    }

    setUserInState = (user) => {
        this.setState({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            city: user.city,
            phoneNumber: user.phoneNumber,
            user: user
        })
    }

    render() {
        const {user} = this.state

        if (!user) {
            return <Spinner/>
        }
        
        return (
            <>
                <div>{`Hello ${this.state.lastName} ${this.state.firstName}`}</div>
                <form onSubmit={this.updateUser}>
                    <input type="email"
                        name="username"
                        placeholder={this.state.username}
                        value={this.state.username} 
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="firstName"
                        placeholder={this.state.firstName}
                        value={this.state.firstName}
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="lastName"
                        placeholder={this.state.lastName}
                        value={this.state.lastName}
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="address"
                        placeholder={this.state.address}
                        value={this.state.address}
                        onChange={this.handleInputChanges}/>
                    <input type="text"
                        name="city"
                        placeholder={this.state.city}
                        value={this.state.city}
                        onChange={this.handleInputChanges}/>
                    <input type="number"
                        name="phoneNumber"
                        placeholder={this.state.phoneNumber}
                        value={this.state.phoneNumber}
                        onChange={this.handleInputChanges}/>
                    <button type="submit">Update user</button>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = {
    logout, updateUserWithToken
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(UserCabinet))