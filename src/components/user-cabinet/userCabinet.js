import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {Spinner} from "reactstrap"

class UserCabinet extends Component {

    state = {
        user: undefined
    }

    componentDidMount() {
        const {userService, token} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
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
            <>
                <div>Hello, {user.username}</div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default WithClothService()(connect(mapStateToProps)(UserCabinet))