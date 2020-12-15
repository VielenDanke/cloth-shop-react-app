import React, {Component} from 'react'
import WithClothService from "../hoc"
import {ACCESS_TOKEN, ROLES} from "../../constants"
import {userLoaded} from "../../actions"
import {connect} from "react-redux"

class LoginForm extends Component {

    state = {
        username: '',
        password: '',
        resultObject: {
            success: true,
            message: ''
        }
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {userService, userLoaded} = this.props
        const {username, password} = this.state

        const loginRequest = {
            username: username,
            password: password
        }

        userService.getConfigurableResource(
            "/auth/login", "POST", {"Content-Type":"application/json"}, loginRequest
            ).then(res => {
                const headers = res.headers
                const accessTokenHeader = headers.get(ACCESS_TOKEN)
                const rolesHeader = headers.get(ROLES)

                if (accessTokenHeader && rolesHeader) {
                    userLoaded(accessTokenHeader, rolesHeader)
                    this.setState({
                        resultObject: {success: true, message: ''},
                        username: '', 
                        password: ''
                    })
                } else {
                    throw new Error("Token or Roles is not defined")
                }
            })
            .catch(reason => {
                this.setState({
                    resultObject: {success: false, message: 'Login or password is not correct'}, 
                    username: '',
                    password: ''
                })
            })
    }

    render() {
        const {resultObject} = this.state

        const errorRendering = resultObject.success ? null : <h2>{resultObject.message}</h2>

        return (
            <div>
                {errorRendering}
                <form onSubmit={this.handleSubmit}>
                    <input type="email" 
                        name="username" 
                        className="form-control" 
                        placeholder="Email"
                        onChange={this.handleInputChanges} 
                        value={this.state.username}/>
                    <input type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password" 
                        onChange={this.handleInputChanges} 
                        value={this.state.password}
                        />
                    <button type="submit">Login</button>
                </form>     
            </div>               
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        roles: state.roles
    }
}

const mapDispatchToProps = {
    userLoaded
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(LoginForm))