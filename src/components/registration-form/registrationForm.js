import React, { Component } from 'react'
import WithClothService from "../hoc"

class RegistrationForm extends Component {

    state = {
        username: '',
        password: '',
        repeatPassword: '',
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

        const {userService} = this.props
        const {username, password, repeatPassword} = this.state

        if (password !== repeatPassword) {
            this.setState({resultObject: {
                success: false,
                message: "Password didn't match"
            }})
            return
        }

        const registrationRequest = {
            username: username,
            password: password
        }

        userService.getConfigurableResource(
            "/auth/registration", "POST", {"Content-Type":"application/json"}, registrationRequest
        ).then(res => {
            this.setState({resultObject: {success: true, message: ''}, username: '', password: '', repeatPassword: ''})
        }).catch(data => {
            this.setState({
                resultObject: {success: false, message: "Registration failed"}, 
                username: '', 
                password: '',
                repeatPassword: ''
            })
        })
    }

    render() {
        const {resultObject} = this.state

        const renderComponent = resultObject.success ? null : <h2>{resultObject.message}</h2>

        return (
            <div>
                {renderComponent}
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
                        value={this.state.password}/>
                    <input type="password" 
                        name="repeatPassword" 
                        className="form-control" 
                        placeholder="Repeat password" 
                        onChange={this.handleInputChanges} 
                        value={this.state.repeatPassword}/>
                    <button type="submit">Registration</button>
                </form>          
            </div>
        )
    }
}

export default WithClothService()(RegistrationForm)