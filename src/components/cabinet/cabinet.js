import React, {Component} from 'react'
import WithClothService from '../hoc'
import {ACCESS_TOKEN} from "../../constants"
import Spinner from '../spinner'

class Cabinet extends Component {

    state = {
        user: null
    }

    componentDidMount() {
        const {userService} = this.props
    
        userService.getUserInSession("/cabinet", "GET", {"Authorization":localStorage.getItem(ACCESS_TOKEN)})
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }

    render() {
        const {user} = this.state

        if (!user) {
            return <Spinner/>
        }

        return (
            <h1>Hello, {user.username}</h1>
        )
    }
}

export default WithClothService()(Cabinet)