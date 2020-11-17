import React, {Component} from 'react'
import WithClothService from '../hoc'
import {ACCESS_TOKEN} from "../../constants"
import Spinner from '../spinner'

class Cabinet extends Component {

    state = {
        user: null,
        error: false
    }

    componentDidMount() {
        const {userService} = this.props
    
        userService.getUserInSession("/cabinet", "GET", {"accessToken":localStorage.getItem(ACCESS_TOKEN)})
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }

    render() {
        const {user, error} = this.state

        if (!user) {
            return <Spinner/>
        }

        if (error) {
            return <h1>Something went wrong</h1>
        }

        return (
            <h1>Hello, {user.username}</h1>
        )
    }
}

export default WithClothService()(Cabinet)