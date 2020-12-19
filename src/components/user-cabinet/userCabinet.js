import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {Spinner} from "reactstrap"
import {logout} from "../../actions"

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
        const {userService, token, logout} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
            .then(res => {
                this.setState({
                    id: res.id,
                    username: res.username,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    address: res.address,
                    city: res.city,
                    phoneNumber: res.phoneNumber,
                    user: res
                })
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

        
    }

    render() {
        const {user} = this.state

        if (!user) {
            return <Spinner/>
        }
        
        return (
            <>
                <div>Hello, {`Hello ${user.lastName} ${user.firstName}`}</div>
                <form onSubmit={this.updateUser}>
                    <input type="text"
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
                    <input type="text"
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
    logout
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(UserCabinet))